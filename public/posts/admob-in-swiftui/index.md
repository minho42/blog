---
title: How to add Google AdMob ad banner in SwiftUI
date: "2024-08-29"
---

## How to add Google AdMob ad banner to SwiftUI with Apple Tracking Transparency (ATT) framework

## Google AdMob

Apps > ADD APP

Ad units > Add ad unit > Banner

    App ID:     ca-app-pub-1111222233334444~1234567890
    Ad unit ID: ca-app-pub-1111222233334444/9876543210

## XCode

XCode > File > Add Package Dependencies

    Google Mobile Ads SDK
    Add Package

Targets > Info > Custom macOS Application Target Properties

    Add Key: "GADApplicationIdentifier"
    Value: "ca-app-pub-1111222233334444~1234567890"

Ways to add above Key/Value to the `Info.plist`:

1. Hoever over pre-existing Keys and click (+) then fill in the Key and Value pair.
   This will create `Info` on the Navigator if not already exists. This can be seen as `Info.plist` in the Finder.
2. If Info exists on the Navigator: right click -> Open As -> Source Code; add below to the XML file.

```xml
<dict>
	<key>GADApplicationIdentifier</key>
	<string>ca-app-pub-1639129328565259~1986806680</string>
...
</dict>
```

## Swift files

> File contents to be updated as my code evolves

### MainApp.swift

Get the `testDeviceIdentifiers` from the warnings: XCode -> Debug Area -> Console.

```swift
// MainApp.swift

import SwiftUI
import GoogleMobileAds

@main
struct MainApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    private let testDeviceIdentifiers = [ "..." ]

    init() {
        GADMobileAds.sharedInstance().start(completionHandler: nil)
        GADMobileAds.sharedInstance().requestConfiguration.testDeviceIdentifiers = self.testDeviceIdentifiers
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

### AppDelegate.swift

```swift
// AppDelegate.swift

import SwiftUI

class AppDelegate: NSObject, UIApplicationDelegate {
    static var orientationLock = UIInterfaceOrientationMask.portrait

    func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
        return AppDelegate.orientationLock
    }
}
```

### AdBannerView.swift

```swift
// AdBannerView.swift

import SwiftUI
import GoogleMobileAds
import AppTrackingTransparency

let AD_UNIT_ID = "ca-app-pub-1111222233334444/9876543210"

struct AdBannerViewWrapper: View {
    @Environment(\.scenePhase) private var scenePhase
    @State private var shouldReload = false
    @State private var adHeight: CGFloat = 50

    var body: some View {
        VStack(spacing: 0) {
            Rectangle()
                .fill(.gray.opacity(0.1))
                .frame(height: 8)

            AdBannerView(shouldReload: $shouldReload)
                .frame(height: adHeight)
                .background(.gray.opacity(0.1))
        }
        .onAppear {
            adHeight = GADPortraitAnchoredAdaptiveBannerAdSizeWithWidth(UIScreen.main.bounds.width).size.height
        }
        .onChange(of: scenePhase) { newPhase in
            if newPhase == .active {
                DispatchQueue.main.async {
                    shouldReload = true
                }
            }
        }
    }
}

struct AdBannerView: UIViewRepresentable {
    @Binding var shouldReload: Bool
    @State private var isTrackingAuthorized = false

    func makeUIView(context: Context) -> GADBannerView {
        let adSize = GADPortraitAnchoredAdaptiveBannerAdSizeWithWidth(UIScreen.main.bounds.width)
        let bannerView = GADBannerView(adSize: adSize)
        bannerView.adUnitID = AD_UNIT_ID
        bannerView.rootViewController = getRootViewController()

        // below line can be removed if Apple Tracking Transparency (ATT) popup appears without delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            Task {
                let authorized = await requestTrackingAuthorization()
                DispatchQueue.main.async {
                    self.isTrackingAuthorized = authorized
                    loadAd(bannerView: bannerView)
                }
            }
        }

        return bannerView
    }

    func updateUIView(_ uiView: GADBannerView, context: Context) {
        if shouldReload {
            loadAd(bannerView: uiView)
            DispatchQueue.main.async {
                shouldReload = false
            }
        }
    }

    private func loadAd(bannerView: GADBannerView) {
        let request = GADRequest()
        if !isTrackingAuthorized {
            let extras = GADExtras()
            extras.additionalParameters = ["npa": "1"]
            request.register(extras)
        }
        bannerView.load(request)
    }

    private func getRootViewController() -> UIViewController? {
        guard let windowScene = UIApplication.shared.connectedScenes
            .first(where: { $0.activationState == .foregroundActive}) as? UIWindowScene else {
            return nil
        }
        return windowScene.windows.first?.rootViewController
    }

    @available(iOS 14, *)
    private func requestTrackingAuthorization() async -> Bool {
        let status = await ATTrackingManager.requestTrackingAuthorization()

        switch status {
        case .authorized:
            print("Tracking authorized 🟢")
            return true
        case .denied:
            print("Tracking denied ❌")
            return false
        case .restricted:
            print("Tracking restricted ❌")
            return false
        case .notDetermined:
            print("Tracking not determined ❌")
            return false
        @unknown default:
            print("Unknown tracking status ❓")
            return false
        }
    }
}
```

Use in view

```swift
AdBannerViewWrapper()
```

Make sure `Test mode` is displayed in the ad banner. If not, grap a new `testDeviceIdentifiers`.
