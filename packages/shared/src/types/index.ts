// Re-export all types (excluding conflicting ones)
export type * from './project';
export type * from './business';
export type * from './block';
export type * from './seo';
export type * from './generator';

// Re-export template types excluding PerformanceMetrics (which conflicts with performance.ts)
export type {
  Template,
  TemplateVariant,
  DefaultBlock,
  ColorSchemePreset,
  TemplateConfig,
  BlockConfig,
  TemplateCustomization,
  ColorScheme,
  FontScheme,
  SpacingScheme
} from './template';

// Re-export performance types
export type * from './performance';

// Re-export enums separately as they need runtime values
export { 
  ProjectStatus,
  AssetType
} from './project';

export {
  Gender,
  IncomeLevel,
  EducationLevel,
  PricingPeriod
} from './business';

export {
  TemplateCategory,
  LayoutStyle
} from './template';

export {
  BlockCategory,
  PropType,
  EditorControl,
  DependencyType,
  PerformanceImpact
} from './block';

export {
  ChangeFrequency
} from './seo';

export {
  ImageFormat,
  CacheStrategy
} from './performance';

export {
  Environment,
  FileType,
  ScriptPosition,
  CDNProvider
} from './generator';