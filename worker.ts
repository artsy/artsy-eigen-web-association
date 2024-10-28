/// <reference types="@cloudflare/workers-types" />

const appleAppSiteAssociation = {
  "activitycontinuation": {
    "apps": [
      "23KMWZ572J.net.artsy.artsy"
    ]
  },
  "webcredentials": {
    "apps": [
      "23KMWZ572J.net.artsy.artsy",
      "23KMWZ572J.net.artsy.Emission",
      "23KMWZ572J.sy.art.folio"
    ]
  },
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "23KMWZ572J.net.artsy.artsy",
        "paths": [
          "NOT /#",
          "NOT /2016-year-in-art",
          "NOT /art-appraisals",
          "NOT /change-password",
          "NOT /collections",
          "NOT /editorial/*",
          "NOT /forgot",
          "NOT /gender-equality*",
          "NOT /identity-verification*",
          "NOT /log_in",
          "NOT /login",
          "NOT /news",
          "NOT /news/*",
          "NOT /reset_password",
          "NOT /series/*",
          "NOT /sign_up",
          "NOT /signup",
          "NOT /users/auth/apple/callback*",
          "NOT /users/auth/facebook/callback*",
          "NOT /users/auth/google/callback*",
          "NOT /venice-biennale*",
          "NOT /video/*",
          "*"
        ]
      }
    ]
  }
};

const assetLinks = [
  {
    "relation": [
      "delegate_permission/common.handle_all_urls"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "net.artsy.app",
      "sha256_cert_fingerprints": [
        "72:70:C3:1C:74:A4:86:D8:F7:31:08:E0:2E:72:D6:91:00:4D:57:35:16:8B:9C:DA:B1:65:5D:49:1D:33:2E:88",
        "03:D2:5C:C6:22:D2:76:BA:D3:A5:A9:19:3C:EF:A6:D1:60:99:14:9B:AD:68:E7:FB:19:52:0D:76:3B:83:DE:87"
      ]
    }
  }
];

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Apple App Site Association
    if (url.pathname === '/.well-known/apple-app-site-association') {
      return new Response(JSON.stringify(appleAppSiteAssociation), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Android Asset Links
    if (url.pathname === '/.well-known/assetlinks.json') {
      return new Response(JSON.stringify(assetLinks), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
