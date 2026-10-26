import { useEffect, useState } from "react";

// Free API key from https://unsplash.com/developers (takes ~1 minute to
// create an app and get an Access Key). Put it in a .env file as
// VITE_UNSPLASH_ACCESS_KEY=your_key_here — see .env.example.
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Demo Unsplash apps are capped at 50 requests/hour. Two things burn that
// quota fast during dev: (1) React StrictMode double-mounting every
// component, and (2) every page refresh re-fetching images that were
// already fetched a minute ago. Both are fixed below by de-duping
// in-flight requests and persisting successful results to sessionStorage,
// so a given query is only ever fetched once per browser tab session.
const SESSION_KEY = "anti-unsplash-cache";
const memoryCache = new Map(loadSessionCache());
const pending = new Map();

function loadSessionCache() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? Object.entries(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function persistToSession(query, url) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    const obj = raw ? JSON.parse(raw) : {};
    obj[query] = url;
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(obj));
  } catch {
    /* sessionStorage unavailable (private browsing, etc.) — fine, just
       won't survive a refresh */
  }
}

function fetchUnsplash(query) {
  if (pending.has(query)) return pending.get(query);

  const promise = fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=1&orientation=squarish`,
    { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } }
  )
    .then((res) => {
      if (res.status === 403) {
        throw new Error(
          "Unsplash 403 — likely the demo app's 50 requests/hour limit was hit. It resets an hour after your first request."
        );
      }
      if (!res.ok) throw new Error(`Unsplash request failed (${res.status})`);
      return res.json();
    })
    .then((data) => {
      const url = data?.results?.[0]?.urls?.small || null;
      if (!url) {
        console.warn(`[useUnsplashImage] no results for query: "${query}"`);
      }
      memoryCache.set(query, url);
      persistToSession(query, url);
      return url;
    })
    .catch((error) => {
      console.warn(`[useUnsplashImage] "${query}" failed:`, error.message);
      throw error;
    })
    .finally(() => {
      pending.delete(query);
    });

  pending.set(query, promise);
  return promise;
}

/**
 * Fetches a real photo from Unsplash matching `query` (e.g. a product
 * name). Returns { url, loading, error }. Falls back gracefully — with
 * loading: false, url: null — if no API key is configured or the request
 * fails, so callers can show placeholder art instead.
 *
 * Check the browser console for a `[useUnsplashImage]` warning if a
 * particular image never shows up — it names the exact reason (no
 * results for that query, rate limit, network error, etc.).
 */
export function useUnsplashImage(query) {
  const [state, setState] = useState(() => {
    if (memoryCache.has(query)) {
      return { url: memoryCache.get(query), loading: false, error: null };
    }
    return { url: null, loading: !!query, error: null };
  });

  useEffect(() => {
    if (!query) {
      setState({ url: null, loading: false, error: null });
      return;
    }

    if (memoryCache.has(query)) {
      setState({ url: memoryCache.get(query), loading: false, error: null });
      return;
    }

    if (!ACCESS_KEY) {
      setState({ url: null, loading: false, error: "no-api-key" });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetchUnsplash(query)
      .then((url) => {
        if (!cancelled) setState({ url, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ url: null, loading: false, error: error.message });
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return state;
}
