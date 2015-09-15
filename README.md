# artsy-eigen-web-association

This tiny app does nothing but serve the `apple-app-site-association` file,
needed for iOS Handoff/Universal Links/Shared Web Credentials to work, in the
required way.

### Serving config file

This app is meant to be used inside other apps. As such, the file serving is
mounted at `/`, which means that the apps using this app should mount it at
`/apple-app-site-association`.

### Changing config file

When making changes, you should do so in the `apple-app-site-association.json`
file.

Once finished with your changes, you’ll need to sign the file so that iOS 8
can confirm the validity of the configuration. Get the `artsy.net` SSL
certificate files from the 1password engineering vault and place them in a
directory. Then create the signed file like so:

    $ make CERT_DIR="/path/to/dir/with/certs"

Be sure to remember to delete the certificate files from your local file system
once done.
