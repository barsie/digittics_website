
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
}

export async function fetchAPI(url:string, options: FetchAPIOptions) {
    const {method, authToken, body, next} = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
    };

    const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
        ...(next && { next }),
    };

    try {
        const response = await fetch(url, fetchOptions);
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json") && response.ok) {
            return await response.json();
        } else {
            return { status: response.status, statusText: response.statusText };
        }
    } catch (error) {
        console.error(`Error ${method} data:`, error);
        throw error;
    }
    
}