export interface Block {
    id: string;
    name: string;
    description: string;
    category: BlockCategory;
    tags: string[];
    props: BlockProp[];
    variants: BlockVariant[];
    defaultProps: Record<string, any>;
    thumbnail: string;
    dependencies?: BlockDependency[];
    performanceImpact: PerformanceImpact;
}
export interface BlockProp {
    name: string;
    type: PropType;
    required: boolean;
    defaultValue?: any;
    description: string;
    validation?: PropValidation;
    editorConfig?: EditorConfig;
}
export interface BlockVariant {
    id: string;
    name: string;
    description: string;
    modifications: Record<string, any>;
    thumbnail?: string;
}
export interface BlockDependency {
    type: DependencyType;
    resource: string;
    critical: boolean;
}
export interface PropValidation {
    min?: number;
    max?: number;
    pattern?: string;
    options?: any[];
    custom?: string;
}
export interface EditorConfig {
    control: EditorControl;
    placeholder?: string;
    helpText?: string;
    group?: string;
    order?: number;
}
export declare enum BlockCategory {
    HERO = "hero",
    HEADER = "header",
    NAVIGATION = "navigation",
    CONTENT = "content",
    FEATURES = "features",
    TESTIMONIALS = "testimonials",
    PRICING = "pricing",
    CONTACT = "contact",
    FOOTER = "footer",
    CTA = "cta",
    GALLERY = "gallery",
    FAQ = "faq",
    FORM = "form",
    SOCIAL = "social",
    MAP = "map",
    VIDEO = "video",
    CUSTOM = "custom"
}
export declare enum PropType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    COLOR = "color",
    IMAGE = "image",
    VIDEO = "video",
    LINK = "link",
    RICH_TEXT = "rich_text",
    SELECT = "select",
    MULTI_SELECT = "multi_select",
    ARRAY = "array",
    OBJECT = "object",
    DATE = "date",
    TIME = "time"
}
export declare enum EditorControl {
    TEXT = "text",
    TEXTAREA = "textarea",
    NUMBER = "number",
    TOGGLE = "toggle",
    COLOR_PICKER = "color_picker",
    IMAGE_PICKER = "image_picker",
    VIDEO_PICKER = "video_picker",
    LINK_PICKER = "link_picker",
    RICH_TEXT_EDITOR = "rich_text_editor",
    SELECT = "select",
    MULTI_SELECT = "multi_select",
    DATE_PICKER = "date_picker",
    TIME_PICKER = "time_picker",
    SLIDER = "slider",
    RADIO = "radio",
    CHECKBOX = "checkbox"
}
export declare enum DependencyType {
    CSS = "css",
    JS = "js",
    FONT = "font",
    ICON = "icon",
    LIBRARY = "library"
}
export declare enum PerformanceImpact {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export interface BlockInstance {
    id: string;
    blockId: string;
    order: number;
    props: Record<string, any>;
    variants: string[];
    hidden: boolean;
}
export interface RenderedBlock {
    html: string;
    css: string;
    js?: string;
    dependencies: BlockDependency[];
    criticalCSS?: string;
}
//# sourceMappingURL=block.d.ts.map