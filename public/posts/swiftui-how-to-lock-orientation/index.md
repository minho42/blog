---
title: How to lock orientation to portrait in SwiftUI
date: "2024-06-16"
---

> Edit (2024-10):
>
> It looks like the orientation setting below works fine on my new machine with the latest Xcode, without extra hassle.

## This doesn't work

![Xcode Device Orientation](/posts/swiftui-how-to-lock-orientation/xcode-device-orientation.webp)

## What works

`AppDelegate.swift`

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

`MainApp.swift`

```swift
// MainApp.swift
import SwiftUI

@main
struct MainApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

`ContentView.swift`

```swift
// ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hi, I'm locked 🔒")
    }
}

```

Ref: https://tutorial101.blogspot.com/2021/09/swiftui-view-portrait-mode-lock.html
