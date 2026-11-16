import { draftMode } from "next/headers";
import qs from "qs";
import { getStrapiURL } from "./get-strapi-url";

export default async function fetchContentType<T>(
  contentType: string,
  params: Record<string, any> = {}
): Promise<T> {
  // Check if Next.js draft mode is enabled
  const { isEnabled: isDraftMode } = await draftMode();
  const baseURL = getStrapiURL()
  
  try {
    const queryParams = { ...params };
    // Add status=draft parameter when draft mode is enabled
    if (isDraftMode) {
      queryParams.status = "draft";
    }
    
    const url = `${baseURL}/${contentType}?${qs.stringify(queryParams)}`;
    const response = await fetch(url, {
        headers: {"strapi-encode-source-maps": isDraftMode ? "true" : "false"}
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi (url=${url}, status=${response.status})`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}