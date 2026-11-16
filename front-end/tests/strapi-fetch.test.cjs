const assert = require("node:assert/strict");
const { test, after } = require("node:test");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  return resolveFilename.call(this, request.startsWith("@/") ? path.join(__dirname, "..", request.slice(2)) : request, ...args);
};
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }), filename);
};

const { getStrapiURL } = require("../utils/get-strapi-url.ts");
const { fetchAPI, StrapiHTTPError } = require("../utils/fetch-api.ts");
const { subscribeAction, eventSubscribeAction } = require("../data/actions.ts");
const originalEnv = { ...process.env };
const originalFetch = global.fetch;
after(() => {
  process.env = originalEnv;
  global.fetch = originalFetch;
  Module._resolveFilename = resolveFilename;
});

test("configuration uses a local fallback only in development and normalizes URLs", () => {
  delete process.env.STRAPI_API_URL;
  process.env.NODE_ENV = "development";
  assert.equal(getStrapiURL(), "http://localhost:1337");
  process.env.NODE_ENV = "production";
  assert.throws(getStrapiURL, /set STRAPI_API_URL/);
  process.env.STRAPI_API_URL = "https://cms.example.test///";
  assert.equal(getStrapiURL(), "https://cms.example.test");
  process.env.STRAPI_API_URL = "https://user:secret@cms.example.test";
  assert.throws(getStrapiURL, /without credentials/);
});

test("fetch uses the configured endpoint and preserves options", async () => {
  process.env.STRAPI_API_URL = "https://cms.example.test/";
  global.fetch = async (url, options) => {
    assert.equal(url, "https://cms.example.test/api/articles?sort=createdAt");
    assert.deepEqual(options, {
      method: "POST",
      headers: { "Content-Type": "application/json", "strapi-encode-source-maps": "true", Authorization: "Bearer token" },
      body: JSON.stringify({ data: { title: "Test" } }),
      next: { revalidate: 0 },
    });
    return Response.json({ data: [1] });
  };
  assert.deepEqual(await fetchAPI("/api/articles?sort=createdAt", {
    method: "POST", authToken: "token", headers: { "strapi-encode-source-maps": "true" },
    body: { data: { title: "Test" } }, next: { revalidate: 0 },
  }), { data: [1] });
  await assert.rejects(fetchAPI("//other.example.test/api", { method: "GET" }), /endpoint/);
});

test("relative preview paths retain the configured base path", async () => {
  process.env.STRAPI_API_URL = "https://cms.example.test/strapi/";
  global.fetch = async (url) => {
    assert.equal(url, "https://cms.example.test/strapi/api/articles?status=draft");
    return Response.json({ data: [] });
  };
  await fetchAPI("api/articles?status=draft", { method: "GET" });
});

test("HTTP errors include endpoint and status and retain the response for signup handling", async () => {
  global.fetch = async () => Response.json({ error: { message: "Duplicate" } }, { status: 400 });
  await assert.rejects(fetchAPI("/api/event-signups?token=secret", { method: "POST" }), (error) => {
    assert.ok(error instanceof StrapiHTTPError);
    assert.equal(error.status, 400);
    assert.deepEqual(error.responseBody, { error: { message: "Duplicate" } });
    assert.equal(Object.keys(error).includes("responseBody"), false);
    assert.match(error.message, /\/api\/event-signups.*400/);
    assert.doesNotMatch(error.message, /secret/);
    return true;
  });
  global.fetch = async () => new Response("bad json", { status: 502, headers: { "content-type": "application/json" } });
  await assert.rejects(fetchAPI("/api/global", { method: "GET" }), (error) =>
    error instanceof StrapiHTTPError && error.status === 502 && error.cause instanceof SyntaxError);
});

test("signup actions preserve validation responses and surface server failures", async () => {
  process.env.STRAPI_API_URL = "https://cms.example.test";
  global.fetch = async () => Response.json({ error: { message: "Duplicate" } }, { status: 400 });
  const newsletter = new FormData();
  newsletter.set("email", "test@example.test");
  assert.equal((await subscribeAction({}, newsletter)).errorMessage, "Already Subscribed.");

  const event = new FormData();
  for (const [key, value] of Object.entries({
    firstName: "Test", lastName: "Person", email: "test@example.test", telephone: "1234567890", eventId: "event",
  })) event.set(key, value);
  assert.equal((await eventSubscribeAction({}, event)).errorMessage, "✅ Already Joined.");

  global.fetch = async () => Response.json({ error: { message: "Unavailable" } }, { status: 500 });
  await assert.rejects(subscribeAction({}, newsletter), (error) =>
    error instanceof StrapiHTTPError && error.status === 500);
});

test("network failures retain their cause without including query strings or tokens", async () => {
  const cause = new Error("connection refused");
  global.fetch = async () => { throw cause; };
  await assert.rejects(fetchAPI("/api/home-page?token=secret", { method: "GET", authToken: "secret" }), (error) => {
    assert.equal(error.cause, cause);
    assert.match(error.message, /network error.*\/api\/home-page/);
    assert.doesNotMatch(error.message, /secret/);
    return true;
  });
});
