/**
 * Core Web Vitals Tracker
 * Monitors and validates CWV metrics for AWEMA sites
 */

export interface WebVitalsMetrics {
  lcp: number;  // Largest Contentful Paint (ms)
  fid: number;  // First Input Delay (ms)
  cls: number;  // Cumulative Layout Shift
  fcp: number;  // First Contentful Paint (ms)
  ttfb: number; // Time to First Byte (ms)
  inp: number;  // Interaction to Next Paint (ms)
}

export interface WebVitalsThresholds {
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  fcp: { good: number; needsImprovement: number };
  ttfb: { good: number; needsImprovement: number };
  inp: { good: number; needsImprovement: number };
}

export enum MetricRating {
  Good = 'good',
  NeedsImprovement = 'needs-improvement',
  Poor = 'poor'
}

export class CoreWebVitals {
  private static readonly DEFAULT_THRESHOLDS: WebVitalsThresholds = {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    fcp: { good: 1800, needsImprovement: 3000 },
    ttfb: { good: 800, needsImprovement: 1800 },
    inp: { good: 200, needsImprovement: 500 }
  };

  private thresholds: WebVitalsThresholds;

  constructor(thresholds: WebVitalsThresholds = CoreWebVitals.DEFAULT_THRESHOLDS) {
    this.thresholds = thresholds;
  }

  /**
   * Rate a single metric based on thresholds
   */
  rateMetric(metric: keyof WebVitalsMetrics, value: number): MetricRating {
    const threshold = this.thresholds[metric];
    
    if (value <= threshold.good) {
      return MetricRating.Good;
    } else if (value <= threshold.needsImprovement) {
      return MetricRating.NeedsImprovement;
    } else {
      return MetricRating.Poor;
    }
  }

  /**
   * Analyze all web vitals metrics
   */
  analyzeMetrics(metrics: WebVitalsMetrics): {
    metrics: WebVitalsMetrics;
    ratings: Record<keyof WebVitalsMetrics, MetricRating>;
    score: number;
    passed: boolean;
  } {
    const ratings: Record<keyof WebVitalsMetrics, MetricRating> = {
      lcp: this.rateMetric('lcp', metrics.lcp),
      fid: this.rateMetric('fid', metrics.fid),
      cls: this.rateMetric('cls', metrics.cls),
      fcp: this.rateMetric('fcp', metrics.fcp),
      ttfb: this.rateMetric('ttfb', metrics.ttfb),
      inp: this.rateMetric('inp', metrics.inp)
    };

    // Calculate score (percentage of good ratings)
    const goodCount = Object.values(ratings).filter(r => r === MetricRating.Good).length;
    const score = Math.round((goodCount / Object.keys(ratings).length) * 100);

    // Passed if all core metrics (LCP, FID, CLS) are good
    const passed = 
      ratings.lcp === MetricRating.Good &&
      ratings.fid === MetricRating.Good &&
      ratings.cls === MetricRating.Good;

    return {
      metrics,
      ratings,
      score,
      passed
    };
  }

  /**
   * Generate performance budget based on current metrics
   */
  generatePerformanceBudget(currentMetrics: WebVitalsMetrics): Record<keyof WebVitalsMetrics, number> {
    const budget: Record<keyof WebVitalsMetrics, number> = {} as any;

    for (const [metric, value] of Object.entries(currentMetrics)) {
      const key = metric as keyof WebVitalsMetrics;
      const threshold = this.thresholds[key];
      
      // Set budget to 80% of "good" threshold or current value, whichever is lower
      budget[key] = Math.min(value, threshold.good * 0.8);
    }

    return budget;
  }

  /**
   * Check if metrics meet performance budget
   */
  checkBudget(
    metrics: WebVitalsMetrics, 
    budget: Record<keyof WebVitalsMetrics, number>
  ): {
    passed: boolean;
    violations: Array<{ metric: string; value: number; budget: number; overBy: number }>;
  } {
    const violations: Array<{ metric: string; value: number; budget: number; overBy: number }> = [];

    for (const [metric, value] of Object.entries(metrics)) {
      const key = metric as keyof WebVitalsMetrics;
      const budgetValue = budget[key];
      
      if (value > budgetValue) {
        violations.push({
          metric,
          value,
          budget: budgetValue,
          overBy: value - budgetValue
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations
    };
  }

  /**
   * Calculate aggregate CWV score for reporting
   */
  calculateCWVScore(metrics: WebVitalsMetrics): number {
    // Weighted scoring based on importance
    const weights = {
      lcp: 0.25,
      fid: 0.25,
      cls: 0.25,
      fcp: 0.1,
      ttfb: 0.1,
      inp: 0.05
    };

    let score = 0;

    for (const [metric, weight] of Object.entries(weights)) {
      const key = metric as keyof WebVitalsMetrics;
      const rating = this.rateMetric(key, metrics[key]);
      
      if (rating === MetricRating.Good) {
        score += weight * 100;
      } else if (rating === MetricRating.NeedsImprovement) {
        score += weight * 50;
      }
      // Poor = 0 points
    }

    return Math.round(score);
  }

  /**
   * Generate recommendations based on metrics
   */
  generateRecommendations(metrics: WebVitalsMetrics): string[] {
    const recommendations: string[] = [];
    const analysis = this.analyzeMetrics(metrics);

    if (analysis.ratings.lcp !== MetricRating.Good) {
      recommendations.push(
        'Improve LCP: Optimize server response times, use CDN, implement resource hints (preload/preconnect)'
      );
    }

    if (analysis.ratings.fid !== MetricRating.Good) {
      recommendations.push(
        'Improve FID: Break up long tasks, use web workers, optimize JavaScript execution'
      );
    }

    if (analysis.ratings.cls !== MetricRating.Good) {
      recommendations.push(
        'Improve CLS: Set explicit dimensions for images/videos, avoid inserting content above existing content'
      );
    }

    if (analysis.ratings.fcp !== MetricRating.Good) {
      recommendations.push(
        'Improve FCP: Reduce render-blocking resources, inline critical CSS, optimize font loading'
      );
    }

    if (analysis.ratings.ttfb !== MetricRating.Good) {
      recommendations.push(
        'Improve TTFB: Use efficient caching, optimize server processing, use CDN for static assets'
      );
    }

    if (analysis.ratings.inp !== MetricRating.Good) {
      recommendations.push(
        'Improve INP: Optimize event handlers, reduce main thread work, implement input debouncing'
      );
    }

    return recommendations;
  }

  /**
   * Format metrics for display
   */
  formatMetrics(metrics: WebVitalsMetrics): Record<string, string> {
    return {
      lcp: `${Math.round(metrics.lcp)}ms`,
      fid: `${Math.round(metrics.fid)}ms`,
      cls: metrics.cls.toFixed(3),
      fcp: `${Math.round(metrics.fcp)}ms`,
      ttfb: `${Math.round(metrics.ttfb)}ms`,
      inp: `${Math.round(metrics.inp)}ms`
    };
  }
}

// Export default instance
export const webVitalsTracker = new CoreWebVitals();