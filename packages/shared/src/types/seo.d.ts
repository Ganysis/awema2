export interface SEOConfig {
    title: string;
    description: string;
    keywords: string[];
    author?: string;
    locale: string;
    robots: RobotsConfig;
    openGraph: OpenGraphConfig;
    twitter: TwitterConfig;
    structuredData: StructuredData[];
    sitemap: SitemapConfig;
    favicon?: FaviconConfig;
}
export interface RobotsConfig {
    index: boolean;
    follow: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number;
}
export interface OpenGraphConfig {
    type: OGType;
    title: string;
    description: string;
    image?: OGImage;
    url: string;
    siteName: string;
    locale: string;
    alternateLocales?: string[];
}
export interface OGImage {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    type?: string;
}
export interface TwitterConfig {
    card: TwitterCard;
    site?: string;
    creator?: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
}
export interface StructuredData {
    type: SchemaType;
    data: Record<string, any>;
}
export interface SitemapConfig {
    enabled: boolean;
    changeFrequency: ChangeFrequency;
    priority: number;
    lastModified?: Date;
    excludePaths?: string[];
}
export interface FaviconConfig {
    ico: string;
    png16: string;
    png32: string;
    png192?: string;
    png512?: string;
    appleTouchIcon?: string;
    manifest?: string;
}
export declare enum OGType {
    WEBSITE = "website",
    ARTICLE = "article",
    BOOK = "book",
    PROFILE = "profile",
    PRODUCT = "product",
    VIDEO = "video",
    MUSIC = "music"
}
export declare enum TwitterCard {
    SUMMARY = "summary",
    SUMMARY_LARGE_IMAGE = "summary_large_image",
    APP = "app",
    PLAYER = "player"
}
export declare enum SchemaType {
    ORGANIZATION = "Organization",
    LOCAL_BUSINESS = "LocalBusiness",
    PERSON = "Person",
    PRODUCT = "Product",
    SERVICE = "Service",
    EVENT = "Event",
    ARTICLE = "Article",
    BREADCRUMB = "BreadcrumbList",
    FAQ = "FAQPage",
    HOW_TO = "HowTo",
    RECIPE = "Recipe",
    VIDEO = "VideoObject"
}
export declare enum ChangeFrequency {
    ALWAYS = "always",
    HOURLY = "hourly",
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    YEARLY = "yearly",
    NEVER = "never"
}
export interface SEOResult {
    meta: string[];
    structuredData: string[];
    robotsTxt: string;
    sitemap: string;
}
//# sourceMappingURL=seo.d.ts.map