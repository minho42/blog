---
title: mitmproxy
date: "2023-06-14"
---

https://docs.mitmproxy.org/stable/

> **mitmproxy** is a set of tools that provide an interactive, SSL/TLS-capable intercepting proxy for HTTP/1, HTTP/2, and WebSockets.

This post shows you how to intercept network traffic from iPhone using mitmproxy on Mac.


### Install mitmproxy on Mac

```shell
❯ brew install mitmproxy
```

### Run mitmproxy

```shell
❯ mitmproxy
```

### Get IP address from Mac

System Preferences -> Network -> Wi-Fi -> Advanced... -> TCP/IP -> IPv4 Address: 10.0.0.3 (your IP will differ)

or run following command

```shell
❯ ifconfig en0 | grep netmask | awk '{print $2}'
10.0.0.3
```

### Configure iPhone to use mitmproxy

Settings -> Wi-Fi -> (i) button from currently connected Wi-Fi -> HTTP PROXY | Configure Proxy

1. Off -> Manual
2. Set Server to IPv4 address from above
3. Set Port to 8080

```text
< Back      Configure Proxy

Off
Manual                   ✅
Automatic

Server              10.0.0.3
Port                   8080
```

### Download configuration profile
Visit http://mitm.it with **Safari** on your iPhone.

> If you see below message when visiting http://mitm.it, 
> make sure: (1) mitmproxy is running and (2) iPhone is configured to use mitmproxy from above.
>
> ```text
> If you can see this, traffic is not passing through mitmproxy
> ```

On http://mitm.it, 
click `Get mitmproxy-ca-cer.pem` for iOS -> Allow

```text
This website is trying to download a configuration profile. Do you want to allow this?

                        Ignore   Allow
```

Click open `Show Instructions` (below `Get mitmproxy-ca-cer.pem`) 
and follow the instructions.

```text
iOS 13+

1. Use Safari to download the certificate.
   Other browsers may not open the 
   proper installation prompt.
   
2. Install the new Profile (Settings ->
   General -> VPN & Device
   Management).

3. Important: Go to Settings -> 
   General -> About -> 
   Certificate Trust Settings.
   Toggle mitmproxy to ON.
```

### 1. Use Safari to download the certificate

We just downloaded above.

### 2. Install the new Profile
 
Settings -> General -> VPN & Device Management

Select the downloaded profile, mitmproxy.

```text
VPN                     Not Connected >

Sign In to Work or School Account...

DOWNLOADED PROFILE
mitmproxy                             >
```

Press Install -> confirm Install

```text
Cancel     Install Profile     Install

mitmproxy

Signed by   mitmproxy
            Not Verified
Contains    Certificate

More Details                         >

Remove Downloaded Profile
```

Profile is installed.

```text
         Profile Installed        Done

mitmproxy

Signed by   mitmproxy
            Verified ✅
Contains    Certificate

More Details                         >
```

### 3. Certificate Trust Settings

Settings -> General -> About -> Certificate Trust Settings

Toggle mitmproxy to ON

```text
< About     Certificate Trust Settings

Trust Store Version         2023032800
Trust Asset Version                 20

ENABLE FULL TRUST FOR ROOT CERTIFICATES
mitmproxy                        (🔘 )

Learn more about trusted certificates
```

### Ready

Run mitmproxy or mitmweb

```shell
❯ mitmweb

[00:06:12.402] HTTP(S) proxy listening at *:8080.
[00:06:12.404] Web server listening at http://127.0.0.1:8081/
```

### Use

Now use your iPhone and network traffic from/to your iPhone will be logged on http://127.0.0.1:8081
