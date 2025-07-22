const { STRAPI_URL, STRAPI_TOKEN } = process.env;


export async function fetchGlobalData() {
  const res = await fetch(`${STRAPI_URL}/api/global`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Error al obtener datos globales: ${res.statusText}`)
  }

  const data = await res.json()
  return data.data
}

export async function fetchLandingPage() {
  const res = await fetch(`${STRAPI_URL}/api/landing-page`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Error al obtener datos landing page: ${res.statusText}`)
  }

  const data = await res.json()
  return data.data
}

export function getStrapiMedia(url?: string) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!url || !base) return "/fallback.png";
  return url.startsWith("/") ? `${base}${url}` : url;
}
