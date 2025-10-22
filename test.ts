import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { defaultAppleAppSiteAssociation, cmsAppleAppSiteAssociation } from "./constants";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  interface AppleAppSiteAssociation {
    activitycontinuation: {
      apps: string[];
    };
    webcredentials?: {
      apps: string[];
    };
    applinks?: {
      apps: string[];
      details: Array<{
        appID: string;
        paths: string[];
      }>;
    };
  }

  interface AssetLinks {
    relation: string[];
    target: {
      namespace: string;
      package_name: string;
      sha256_cert_fingerprints: string[];
    };
  }

  beforeAll(async () => {
    worker = await unstable_dev("./worker.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return the apple-app-site-association JSON on the correct route", async () => {
    const resp = await worker.fetch("/.well-known/apple-app-site-association");

    expect(resp.status).toBe(200);
    expect(resp.headers.get("content-type")).toBe("application/json");

    const json = await resp.json() as AppleAppSiteAssociation;

    expect(json).toHaveProperty("activitycontinuation");
    expect(json.activitycontinuation).toHaveProperty("apps");

    expect(json).toHaveProperty("applinks");
    expect(json.applinks).toHaveProperty("details");
    expect(json.applinks).toHaveProperty("apps");
    expect(json.applinks?.details[0]).toHaveProperty("paths");
  });

  it("should return the assetLinks JSON on the correct route", async () => {
    const resp = await worker.fetch("/.well-known/assetlinks.json");

    expect(resp.status).toBe(200);
    expect(resp.headers.get("content-type")).toBe("application/json");

    const json = await resp.json() as Array<AssetLinks>;
    const assetLinks = json[0];

    expect(assetLinks).toHaveProperty("relation");
    expect(assetLinks).toHaveProperty("target");
    expect(assetLinks.target).toHaveProperty("namespace");
    expect(assetLinks.target).toHaveProperty("package_name");
    expect(assetLinks.target).toHaveProperty("sha256_cert_fingerprints");
  });

  it("should return apple-developer-merchantid-domain-association on the correct route", async () => {
    const resp = await worker.fetch("/.well-known/apple-developer-merchantid-domain-association");

    expect(resp.status).toBe(200);
    expect(resp.headers.get("content-type")).toBe("text/plain");

    const text = await resp.text() as string;

    expect(text).toMatch(/7B2270.*30227D/);
    expect(text).toHaveLength(9094);
  });

  it("should disable universal links for cms.artsy.net domain", async () => {
    const resp = await worker.fetch("https://cms.artsy.net/.well-known/apple-app-site-association");

    expect(resp.status).toBe(200);
    expect(resp.headers.get("content-type")).toBe("application/json");

    const json = await resp.json();

    expect(json).toEqual(cmsAppleAppSiteAssociation);
  });

  it("should return default applinks for non-cms domains", async () => {
    const resp = await worker.fetch("https://artsy.net/.well-known/apple-app-site-association");

    expect(resp.status).toBe(200);
    expect(resp.headers.get("content-type")).toBe("application/json");

    const json = await resp.json();

    expect(json).toEqual(defaultAppleAppSiteAssociation);
  });
});
