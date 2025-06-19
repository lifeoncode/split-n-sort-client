import type { HttpRequestArgs } from "./types";

export const API_BASE_URL = "https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev";

const defaultHeaders: HeadersInit = { "Content-Type": "application/json" };

export const httpRequest = async <ResponseType>({
  url,
  method = "GET",
  headers = defaultHeaders,
  body,
  timeout = 10000,
}: HttpRequestArgs): Promise<ResponseType> => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { method, headers, body, signal: controller.signal });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
};
