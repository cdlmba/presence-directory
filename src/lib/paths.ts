/** Must match `base` in astro.config.mjs */
export const BASE_PATH = '/presence';

export const SITE_ORIGIN = 'https://thesystemsdad.com';

/** Site root under the main domain (trailing slash). */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}/`;

/** Root-relative URL under the Presence base (e.g. /presence/audit). */
export function path(route: string): string {
  const segment = route.startsWith('/') ? route : `/${route}`;
  if (segment === '/') return `${BASE_PATH}/`;
  return `${BASE_PATH}${segment}`;
}

/** Absolute public URL for a route within Presence. */
export function absoluteUrl(route: string): string {
  return new URL(path(route), `${SITE_ORIGIN}/`).href;
}
