# artsy-eigen-web-association

This repo manages `apple-app-site-association` and `assetlinks.json` files,
needed for iOS Handoff/Universal Links/Shared Web Credentials to work.
These are deployed to cloudflare worker via deploy prs.

For more information see:

- [Handoff programming guide](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/AdoptingHandoff/AdoptingHandoff.html#//apple_ref/doc/uid/TP40014338-CH2-SW10)
- [Universal Links programming guide](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html)
- [Shared Web Credentials programming guide](https://developer.apple.com/library/ios/documentation/Security/Reference/SharedWebCredentialsRef/)
- [Android App Links Guide](https://developer.android.com/training/app-links)

## Testing the served config locally

Install dependencies:
`yarn install`

Run the local worker server:
`yarn dev`

In the output you should see the url of the running server.
You can fetch the configs at:
`<YOUR-LOCAL-SERVER-URL>/.well-known/apple-app-site-association`
and:
`<YOUR-LOCAL-SERVER-URL>/.well-known/assetlinks.json`

You can verify config correctness [here](https://yurl.chayev.com).

## Changing config file

When making changes, you should do so in the `worker.ts` file in the `appleAppSiteAssociation` for apple and the `assetLinks` object for android.

## After config changes are merged

A deploy pr should open automatically, merging this will result in deploying the worker to production which will in turn update the files everywhere.

## Caching

Apple caches the apple-app-site-association file on app install. If you're having trouble clearing the apple-app-site-association file cache on your device, try updating the app or turn Universal Linking [off (and on again)](https://stackoverflow.com/questions/32729489/how-can-i-reset-ios-9-universal-linking-settings). While it's not known how often the cache is updated, it does appear to periodically between installs and updates. More details about how Apple caches this file can be found on this [Stack Overflow answer](https://stackoverflow.com/a/41305871).
