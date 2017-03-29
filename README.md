# artsy-eigen-web-association

This tiny app does nothing but serve the `apple-app-site-association` file,
needed for iOS Handoff/Universal Links/Shared Web Credentials to work, in the
required way.

For more information see:

* [Handoff programming guide](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/AdoptingHandoff/AdoptingHandoff.html#//apple_ref/doc/uid/TP40014338-CH2-SW10)
* [Universal Links programming guide](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html)
* [Shared Web Credentials programming guide](https://developer.apple.com/library/ios/documentation/Security/Reference/SharedWebCredentialsRef/)

## Serving config file

This app is meant to be used inside other apps. As such, the file serving is
mounted at `/`, which means that the apps using this app should mount it at
`/apple-app-site-association`.

Once mounted, you should be able to verify it’s correctness [here](https://limitless-sierra-4673.herokuapp.com).

## Changing config file

When making changes, you should do so in the `apple-app-site-association.json`
file.
