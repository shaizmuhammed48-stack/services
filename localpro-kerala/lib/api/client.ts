const API_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "";

export async function fetchFromAPI<T = any>(params: Record<string, string> = {}): Promise<T> {
  if (!API_URL) {
    throw new Error("Google Apps Script URL not configured. Please set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL in environment variables.");
  }

  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function postToAPI<T = any>(body: Record<string, any>): Promise<T> {
  if (!API_URL) {
    throw new Error("Google Apps Script URL not configured. Please set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL in environment variables.");
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data;
}
