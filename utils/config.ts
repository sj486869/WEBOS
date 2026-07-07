/**
 * Central config for WEBOS.
 * Update NEXT_PUBLIC_MEDIA_SERVER_URL in .env.local to change the Media Server URL everywhere.
 */
export const MEDIA_SERVER_URL =
  (process.env.NEXT_PUBLIC_MEDIA_SERVER_URL || "https://i-try.onrender.com").replace(/\/+$/, "");
