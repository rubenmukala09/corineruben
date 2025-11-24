// Performance monitoring utility for lazy-loaded components and Web Vitals
class PerformanceMonitor {
  private metrics: Map<string, { start: number; end?: number; duration?: number }> = new Map();
  private enabled: boolean = import.meta.env.DEV;
  private webVitals: {
    lcp?: number;
    fid?: number;
    cls?: number;
  } = {};

  startTracking(componentName: string) {
    if (!this.enabled) return;
    
    this.metrics.set(componentName, {
      start: performance.now(),
    });
    
    console.log(`🚀 [Performance] Loading ${componentName}...`);
  }

  endTracking(componentName: string) {
    if (!this.enabled) return;
    
    const metric = this.metrics.get(componentName);
    if (!metric) return;

    const end = performance.now();
    const duration = end - metric.start;
    
    metric.end = end;
    metric.duration = duration;
    
    const status = duration < 100 ? '✅' : duration < 500 ? '⚠️' : '❌';
    console.log(
      `${status} [Performance] ${componentName} loaded in ${duration.toFixed(2)}ms`
    );
  }

  // Web Vitals tracking
  trackWebVitals() {
    if (!this.enabled || typeof window === 'undefined') return;

    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      this.webVitals.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      console.log(`📊 [LCP] ${this.webVitals.lcp.toFixed(2)}ms`, 
        this.webVitals.lcp < 2500 ? '✅ Good' : this.webVitals.lcp < 4000 ? '⚠️ Needs Improvement' : '❌ Poor');
    });
    
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP not supported in this browser
    }

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
        this.webVitals.fid = entry.processingStart ? entry.processingStart - entry.startTime : 0;
        console.log(`⚡ [FID] ${this.webVitals.fid.toFixed(2)}ms`,
          this.webVitals.fid < 100 ? '✅ Good' : this.webVitals.fid < 300 ? '⚠️ Needs Improvement' : '❌ Poor');
      });
    });
    
    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // FID not supported in this browser
    }

    // Track Cumulative Layout Shift (CLS)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value || 0;
          this.webVitals.cls = clsScore;
          console.log(`📏 [CLS] ${this.webVitals.cls.toFixed(3)}`,
            this.webVitals.cls < 0.1 ? '✅ Good' : this.webVitals.cls < 0.25 ? '⚠️ Needs Improvement' : '❌ Poor');
        }
      });
    });
    
    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // CLS not supported in this browser
    }
  }

  getWebVitals() {
    return this.webVitals;
  }

  getMetrics() {
    if (!this.enabled) return [];
    
    return Array.from(this.metrics.entries()).map(([name, metric]) => ({
      component: name,
      duration: metric.duration,
      start: metric.start,
      end: metric.end,
    }));
  }

  getSummary() {
    if (!this.enabled) return null;
    
    const metrics = this.getMetrics().filter(m => m.duration !== undefined);
    if (metrics.length === 0) return null;

    const totalDuration = metrics.reduce((sum, m) => sum + (m.duration || 0), 0);
    const avgDuration = totalDuration / metrics.length;
    const slowest = metrics.reduce((prev, current) => 
      (current.duration || 0) > (prev.duration || 0) ? current : prev
    );
    const fastest = metrics.reduce((prev, current) => 
      (current.duration || 0) < (prev.duration || 0) ? current : prev
    );

    return {
      totalComponents: metrics.length,
      totalDuration: totalDuration.toFixed(2),
      avgDuration: avgDuration.toFixed(2),
      slowest: { component: slowest.component, duration: slowest.duration?.toFixed(2) },
      fastest: { component: fastest.component, duration: fastest.duration?.toFixed(2) },
    };
  }

  printSummary() {
    if (!this.enabled) return;
    
    const summary = this.getSummary();
    if (!summary) return;

    console.log('\n📊 [Performance Summary]');
    console.log(`Total Components Loaded: ${summary.totalComponents}`);
    console.log(`Total Load Time: ${summary.totalDuration}ms`);
    console.log(`Average Load Time: ${summary.avgDuration}ms`);
    console.log(`Slowest: ${summary.slowest.component} (${summary.slowest.duration}ms)`);
    console.log(`Fastest: ${summary.fastest.component} (${summary.fastest.duration}ms)`);
    
    // Print Web Vitals
    if (Object.keys(this.webVitals).length > 0) {
      console.log('\n🎯 [Web Vitals]');
      if (this.webVitals.lcp) {
        console.log(`LCP: ${this.webVitals.lcp.toFixed(2)}ms (target: < 2500ms)`);
      }
      if (this.webVitals.fid) {
        console.log(`FID: ${this.webVitals.fid.toFixed(2)}ms (target: < 100ms)`);
      }
      if (this.webVitals.cls) {
        console.log(`CLS: ${this.webVitals.cls.toFixed(3)} (target: < 0.1)`);
      }
    }
    console.log('\n');
  }

  reset() {
    this.metrics.clear();
    this.webVitals = {};
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Initialize Web Vitals tracking when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Start tracking Web Vitals after a short delay to ensure DOM is ready
    setTimeout(() => {
      performanceMonitor.trackWebVitals();
    }, 100);
  });

  // Log summary when navigating away or closing
  window.addEventListener('beforeunload', () => {
    performanceMonitor.printSummary();
  });
}
