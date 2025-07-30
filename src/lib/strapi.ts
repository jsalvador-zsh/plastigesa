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
  if (!url || !base) return "/placeholder.svg";
  return url.startsWith("/") ? `${base}${url}` : url;
}

export async function getAllSlugs() {
  const url = `${process.env.STRAPI_URL}/api/articles?fields=slug`

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Error HTTP ${res.status}: ${errorText}`)
    }

    const json = await res.json()

    if (!json.data) {
      throw new Error("No se encontró 'data' en la respuesta")
    }

    return json.data.map((item: any) => item.slug)
  } catch (error) {
    console.error("Error en getAllSlugs:", error)
    throw new Error("Error al obtener los slugs de artículos")
  }
}

export async function getArticleBySlug(slug: string) {
  const url = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate[author][populate]=image&populate[contentTags]=*&populate[featuredImage]=*`
  
  try {
    const res = await fetch(url, { 
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)
    }

    const json = await res.json()
    const item = json.data?.[0]
    
    if (!item) return null

    return {
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      slug: item.slug,
      content: item.content,
      time: item.time,
      date: item.date,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      locale: item.locale,
      featuredImage: item.featuredImage,
      author: item.author,
      contentTags: item.contentTags,
    }
  } catch (error) {
    console.error("Error en getArticleBySlug:", error)
    return null
  }
}

// Función adicional para obtener todos los artículos (útil para la página del blog)
export async function getAllArticles(page = 1, pageSize = 25) {
  const url = `${STRAPI_URL}/api/articles?populate[author][populate]=image&populate[contentTags]=*&populate[featuredImage]=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)
    }

    const json = await res.json()
    return {
      data: json.data || [],
      meta: json.meta || {}
    }
  } catch (error) {
    console.error("Error en getAllArticles:", error)
    return {
      data: [],
      meta: {}
    }
  }
}

// Función simplificada para obtener TODOS los artículos (sin paginación)
export async function getAllArticlesNoPagination() {
  const url = `${STRAPI_URL}/api/articles?populate[author][populate]=image&populate[contentTags]=*&populate[featuredImage]=*&sort=publishedAt:desc&pagination[pageSize]=100`
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)
    }

    const json = await res.json()
    return json.data || []
  } catch (error) {
    console.error("Error en getAllArticlesNoPagination:", error)
    return []
  }
}

// Función para obtener artículos por categoría
export async function getArticlesByCategory(category: string, page = 1, pageSize = 6) {
  const url = `${STRAPI_URL}/api/articles?filters[contentTags][title][$eq]=${category}&populate[author][populate]=image&populate[contentTags]=*&populate[featuredImage]=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)
    }

    const json = await res.json()
    return {
      data: json.data || [],
      meta: json.meta || {}
    }
  } catch (error) {
    console.error("Error en getArticlesByCategory:", error)
    return {
      data: [],
      meta: {}
    }
  }
}

// Función para buscar artículos
export async function searchArticles(query: string, page = 1, pageSize = 6) {
  const url = `${STRAPI_URL}/api/articles?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate[author][populate]=image&populate[contentTags]=*&populate[featuredImage]=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)
    }

    const json = await res.json()
    return {
      data: json.data || [],
      meta: json.meta || {}
    }
  } catch (error) {
    console.error("Error en searchArticles:", error)
    return {
      data: [],
      meta: {}
    }
  }
}