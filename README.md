# artsy-eigen-web-association

This tiny app does nothing but serve the `apple-app-site-association` file,
needed for iOS Handoff/Universal Links/Shared Web Credentials to work, in the
required way.

For more information see:

- [Handoff programming guide](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/AdoptingHandoff/AdoptingHandoff.html#//apple_ref/doc/uid/TP40014338-CH2-SW10)
- [Universal Links programming guide](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html)
- [Shared Web Credentials programming guide](https://developer.apple.com/library/ios/documentation/Security/Reference/SharedWebCredentialsRef/)
- [Sailthru Universal Links Documentation](https://getstarted.sailthru.com/mobile/apple-ios-app-universal-links/)
- [Sailthru UL FAQ](https://sailthru.zendesk.com/hc/en-us/articles/217102466-Universal-Links-Troubleshooting-and-FAQ)

## Serving config file

This app is meant to be used inside other apps. As such, the file serving is
mounted at `/`, which means that the apps using this app should mount it at
`/apple-app-site-association`.

Once mounted, you should be able to verify it’s correctness [here](https://branch.io/resources/aasa-validator/).

For Sailthru, the file needs to be uploaded to the Universal Links [settings
page](https://my.sailthru.com/settings/universal_links). This uploads the file to Sailthru, but it does not actually update the [hosted config](https://link.artsy.net/apple-app-site-association). Therefore, we need to reach out to support@sailthru.com and ask them to make the change once uploaded.

## Changing config file

When making changes, you should do so in the `apple-app-site-association.json`
file and then run `yarn build` to encode new paths for Sailthru or remove old
ones.

## After config changes are merged

After changes to the `apple-app-site-association.json` file have been merged, you'll need to update the three places that depend on it which include force, artsy-wwwify, and Sailthru. To update the package in force and artsy-wwwify run the command `yarn upgrade artsy-eigen-web-association` in those repositories and check that in. Updates to Sailthru requires you to notify Sailthru support which someone from `#crm` slack channel can help with.

## Caching

Apple caches the apple-app-site-association file on app install. If you're having trouble clearing the apple-app-site-association file cache on your device, try updating the app or turn Universal Linking [off (and on again)](https://stackoverflow.com/questions/32729489/how-can-i-reset-ios-9-universal-linking-settings). While it's not known how often the cache is updated, it does appear to periodically between installs and updates. More details about how Apple caches this file can be found on this [Stack Overflow answer](https://stackoverflow.com/a/41305871).
