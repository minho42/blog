---
title: React Native Expo CommandError
date: "2023-05-16"
---

React Native Expo CommandError when running `npm start`

```shell
CommandError: "react-native-web" is added as a dependency in your project's package.json but it doesn't seem to be installed. Please run "yarn" or "npm install" to fix this issue.
```

## Fix

```shell
rm -rf node_modules

sudo npm i

npm start
```
