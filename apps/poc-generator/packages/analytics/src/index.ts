/**
 * Analytics Package
 * Performance monitoring and reporting for AWEMA
 */

export { LighthouseAnalyzer, defaultAnalyzer } from './LighthouseAnalyzer';
export type { LighthouseResult, LighthouseTarget } from './LighthouseAnalyzer';

export { CoreWebVitals, webVitalsTracker, MetricRating } from './CoreWebVitals';
export type { WebVitalsMetrics, WebVitalsThresholds } from './CoreWebVitals';

export { PerformanceReporter, performanceReporter } from './PerformanceReporter';
export type { 
  PerformanceReport, 
  SitePerformanceData, 
  BundleMetrics, 
  PerformanceSummary, 
  Phase1KPIs 
} from './PerformanceReporter';