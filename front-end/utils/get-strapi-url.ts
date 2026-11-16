export function getStrapiURL() {
    const configuredURL = process.env.STRAPI_API_URL?.trim();
    if (!configuredURL) {
        if (process.env.NODE_ENV === "development") return "http://localhost:1337";
        throw new Error("Strapi configuration error: set STRAPI_API_URL to the CMS base URL.");
    }

    let url: URL;
    try {
        url = new URL(configuredURL);
    } catch {
        throw new Error("Strapi configuration error: STRAPI_API_URL must be an absolute HTTP(S) URL.");
    }
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
        throw new Error("Strapi configuration error: STRAPI_API_URL must be an HTTP(S) URL without credentials, query, or fragment.");
    }
    return url.href.replace(/\/+$/, "");
}