import { getStrapiURL } from "./get-strapi-url";
type NextFetchRequestConfig = {
    revalidate?: number | false;
    tags?: string[];
    cache?: "no-store";
}

interface FetchAPIOptions{
    method: "GET" | "POST" | "PUT" | "DELETE";
    authToken?: string;
    body?: Record<string, unknown>;
    next?: NextFetchRequestConfig;
    headers?: Record<string, string>;
}

export class StrapiHTTPError extends Error {
    constructor(public status: number, public responseBody: unknown, endpoint: string, cause?: unknown) {
        super(`Strapi HTTP error: ${endpoint} returned status ${status}.`, { cause });
        this.name = "StrapiHTTPError";
        Object.defineProperty(this, "responseBody", { enumerable: false });
    }
}

export async function fetchAPI(path: string, options: FetchAPIOptions) {
    const {method, authToken, body, next, headers: extraHeaders} = options;
    const baseURL = new URL(`${getStrapiURL()}/`);
    const url = new URL(path, baseURL);
    if (url.origin !== baseURL.origin || path.startsWith("//") || path.startsWith("/\\")) {
        throw new Error("Strapi request error: endpoint must be a relative path on the configured CMS.");
    }
    const endpoint = url.pathname;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...extraHeaders,
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
    };

    const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
        ...(next && { next }),
    };

    let response: Response;
    try {
        response = await fetch(url.href, fetchOptions);
    } catch (cause) {
        throw new Error(`Strapi network error: ${method} ${endpoint} failed. Check STRAPI_API_URL and CMS availability.`, { cause });
    }

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
        let responseBody: unknown;
        if (contentType?.includes("application/json")) {
            try {
                responseBody = await response.json();
            } catch (cause) {
                throw new StrapiHTTPError(response.status, undefined, endpoint, cause);
            }
        }
        throw new StrapiHTTPError(response.status, responseBody, endpoint);
    }
    if (contentType?.includes("application/json")) return await response.json();
    return { status: response.status, statusText: response.statusText };
}