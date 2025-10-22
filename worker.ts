/// <reference types="@cloudflare/workers-types" />

// @ts-ignore
import appleDeveloperMerchantidDomainAssociation from "./apple-developer-merchantid-domain-association.txt"
import { defaultAppleAppSiteAssociation, cmsAppleAppSiteAssociation, assetLinks } from "./constants";

// Re-export for backwards compatibility
export { defaultAppleAppSiteAssociation, cmsAppleAppSiteAssociation, assetLinks }; 

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Apple App Site Association
    if (url.pathname === '/.well-known/apple-app-site-association') {
      let responseBody;
      const hostname = url.hostname;
      if (hostname === 'cms.artsy.net') {
        // Disable universal links for the CMS domain
        // We want to handle these links in CMS directly
        responseBody = cmsAppleAppSiteAssociation;
      } else {
        // Normal behavior for artsy.net and others
        responseBody = defaultAppleAppSiteAssociation;
      }

      return new Response(JSON.stringify(responseBody), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Android Asset Links
    if (url.pathname === '/.well-known/assetlinks.json') {
      return new Response(JSON.stringify(assetLinks), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Apple Developer Merchantid Domain Association
    if (url.pathname === '/.well-known/apple-developer-merchantid-domain-association') {
      return new Response(appleDeveloperMerchantidDomainAssociation, {
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
