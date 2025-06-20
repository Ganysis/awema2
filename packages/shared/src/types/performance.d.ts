export interface PerformanceConfig {
    optimization: OptimizationSettings;
    caching: CachingSettings;
    compression: CompressionSettings;
    images: ImageOptimizationSettings;
    fonts: FontOptimizationSettings;
    scripts: ScriptOptimizationSettings;
    styles: StyleOptimizationSettings;
    preloading: PreloadingSettings;
}
export interface OptimizationSettings {
    minifyHTML: boolean;
    minifyCSS: boolean;
    minifyJS: boolean;
    removeComments: boolean;
    removeWhitespace: boolean;
    inlineCSS: boolean;
    inlineJS: boolean;
    criticalCSS: boolean;
    lazyLoading: boolean;
    bundleAssets: boolean;
}
export interface CachingSettings {
    enabled: boolean;
    strategy: CacheStrategy;
    maxAge: number;
    staleWhileRevalidate?: number;
    mustRevalidate?: boolean;
    public: boolean;
    immutable?: boolean;
    varyHeaders?: string[];
}
export interface CompressionSettings {
    gzip: boolean;
    brotli: boolean;
    level: number;
    threshold: number;
}
export interface ImageOptimizationSettings {
    formats: ImageFormat[];
    quality: number;
    lazy: boolean;
    responsive: boolean;
    webp: boolean;
    avif: boolean;
    sizes: ImageSize[];
    placeholder: PlaceholderType;
}
export interface FontOptimizationSettings {
    subset: boolean;
    preload: boolean;
    display: FontDisplay;
    fallbacks: string[];
    variableFont: boolean;
}
export interface ScriptOptimizationSettings {
    defer: boolean;
    async: boolean;
    module: boolean;
    concatenate: boolean;
    treeShake: boolean;
    sourceMaps: boolean;
    target: ScriptTarget;
}
export interface StyleOptimizationSettings {
    purgeUnused: boolean;
    autoprefixer: boolean;
    postcss: boolean;
    cssModules: boolean;
    cssInJs: boolean;
    extractCritical: boolean;
}
export interface PreloadingSettings {
    fonts: boolean;
    images: boolean;
    scripts: boolean;
    styles: boolean;
    preconnect: string[];
    dnsPrefetch: string[];
}
export declare enum CacheStrategy {
    NO_CACHE = "no-cache",
    NO_STORE = "no-store",
    PUBLIC = "public",
    PRIVATE = "private",
    IMMUTABLE = "immutable"
}
export declare enum ImageFormat {
    JPEG = "jpeg",
    PNG = "png",
    WEBP = "webp",
    AVIF = "avif",
    SVG = "svg"
}
export interface ImageSize {
    width: number;
    height?: number;
    suffix: string;
}
export declare enum PlaceholderType {
    NONE = "none",
    BLUR = "blur",
    LQIP = "lqip",
    COLOR = "color",
    SKELETON = "skeleton"
}
export declare enum FontDisplay {
    AUTO = "auto",
    BLOCK = "block",
    SWAP = "swap",
    FALLBACK = "fallback",
    OPTIONAL = "optional"
}
export declare enum ScriptTarget {
    ES5 = "es5",
    ES6 = "es6",
    ES2017 = "es2017",
    ES2018 = "es2018",
    ES2019 = "es2019",
    ES2020 = "es2020",
    ES2021 = "es2021",
    ES2022 = "es2022",
    ESNEXT = "esnext"
}
export interface PerformanceMetrics {
    lighthouseScore: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    timeToInteractive: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
    pageSize: number;
    requests: number;
    domContentLoaded: number;
    loadTime: number;
}
export interface OptimizationResult {
    originalSize: number;
    optimizedSize: number;
    savingsPercent: number;
    savingsBytes: number;
    metrics: PerformanceMetrics;
    recommendations: string[];
}
//# sourceMappingURL=performance.d.ts.map