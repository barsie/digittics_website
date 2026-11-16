import { draftMode } from "next/headers";
import qs from "qs";
import { fetchAPI } from "./fetch-api";

export default async function fetchContentType<T>(
  contentType: string,
  params: Record<string, any> = {}
): Promise<T> {
  // Check if Next.js draft mode is enabled
  const { isEnabled: isDraftMode } = await draftMode();
  const queryParams = { ...params };
  // Add status=draft parameter when draft mode is enabled
  if (isDraftMode) {
    queryParams.status = "draft";
  }

  return fetchAPI(`${contentType.replace(/^\/+/, "")}?${qs.stringify(queryParams)}`, {
    method: "GET",
    headers: {"strapi-encode-source-maps": isDraftMode ? "true" : "false"},
  });
}