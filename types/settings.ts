export interface HeroSettings {
  title: string
  subtitle: string
  cta_primary: string
  cta_secondary: string
  background_image: string
}

export interface AnnouncementBarSettings {
  text: string
  color: string
  is_active: boolean
}

export interface SocialLinks {
  instagram: string
  facebook: string
  tiktok: string
  whatsapp: string
  twitter: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
}

export interface SiteColors {
  primary: string
  accent: string
  gold: string
}

export interface SiteSettings {
  store_name: string
  logo: string
  hero: HeroSettings
  announcement_bar: AnnouncementBarSettings
  social_links: SocialLinks
  contact: ContactInfo
  footer_text: string
  colors: SiteColors
}

export type SettingsKey = keyof SiteSettings
