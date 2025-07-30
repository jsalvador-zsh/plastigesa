export interface GlobalResponse {
  data: GlobalData
  meta: Record<string, any>
}

export interface GlobalData {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  title: string
  description: string
  banner: Banner
  header: Header
  footer: Footer
}

export interface Banner {
  id: number
  label: string
  href: string
  isExternal: boolean
  isVisible: boolean
  badge: string
}

export interface Header {
  id: number
  logo: Logo
  navitems: NavItem[]
  cta: NavItem
}

export interface Footer {
  id: number
  text: string
  logo: Logo
  navitems: NavItem[]
  socialitems: SocialItem[]
}

export interface Logo {
  id: number
  text: string
  href: string
  isExternal: boolean
  hasIcon: boolean
  icon: string | null
  image: Image
}

export interface Image {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
}

export interface RichText {
  type: string
  children: { text: string; type?: string }[]
}

export interface NavItem {
  id: number
  label: string
  href: string
  isButton: boolean
  isExternal: boolean
  isVisible: boolean
  type: 'primary' | 'secondary' | string | null
}
export interface Link {
  id: number
  label: string
  href: string
  isButton: boolean
  isExternal: boolean
  isVisible: boolean
  type: 'primary' | 'secondary' | string | null
}

export interface SocialItem {
  id: number
  text: string
  href: string
  isExternal: boolean
  hasIcon: boolean
  icon: string
}

export interface GridCardItem {
  id: number
  heading: string | null
  text: string
  number: number
  icon: string
  badge: string | null
  image: Image
}

export interface BentoCardItem {
  id: number
  heading: string
  text: string
  badge: string
  sizeCard: null | "small" | "medium" | "large" | "wide"
  image: Image
}

// DynamicBlock interface for blocks in the dynamic zone
export interface HeroBlock {
  __component: 'blocks.hero'
  id: number
  heading: string
  span: {
    type: string
    children: { text: string; type: string }[]
  }[]
  text: string
  links: Link[]
  images: Image[]
}

export interface BlockSectionHeader {
  __component: "blocks.section-header"
  id: number
  heading: string
  subheading: string
  badge: string
  anchorLink: Link | null
}

export interface BlockContentWithVideo {
  __component: "blocks.content-with-video"
  id: number
  heading: string
  text: RichText[]
  reversed: boolean
  videoUrl: string
  thumbnail: Image
}

export interface BlockContentWithImage {
  __component: "blocks.content-with-image"
  id: number
  heading: string
  text: RichText[]
  features: RichText[]
  reversed: boolean
  image: Image
}

export interface BlockGridCard {
  __component: "blocks.grid-card"
  id: number
  cards: GridCardItem[]
}

export interface BlockGridCardImage {
  __component: "blocks.grid-card-image"
  id: number
  cards: GridCardItem[]
  image: Image

}
export interface BlockBentoGridCard {
  __component: "blocks.bento-grid-card"
  id: number
  cards: BentoCardItem[]
}

export interface BlockCarousel {
  url: string | undefined
  __component: "blocks.carousel"
  id: number

  images: Images[]
}


export interface BlockFeaturedArticles {
  __component: "blocks.featured-articles"
  id: number
  articles: Article[]
}

export interface Article {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  time: number
  content: string // contenido en formato Markdown
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  featuredImage: Image
  author: Author
  date: string
  contentTags: ContentTag[]
}

export interface Author {
  id: number
  documentId: string
  fullName: string
  bio: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  image: Image
}

export interface ContentTag {
  id: number
  documentId: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface Image {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
}

export type DynamicBlock =
  | BlockHero
  | BlockSectionHeader
  | BlockContentWithVideo
  | BlockContentWithImage
  | BlockGridCard
  | BlockGridCardImage
  | BlockBentoGridCard
  | BlockCarousel
  | BlockFeaturedArticles