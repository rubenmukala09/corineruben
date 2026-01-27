// Performance monitoring utility for lazy-loaded components
class PerformanceMonitor {
  private metrics: Map<string, { start: number; end?: number; duration?: number }> = new Map();
  private enabled: boolean = import.meta.env.DEV;

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
    if (!this.enabled || !import.meta.env.DEV) return;
    
    const summary = this.getSummary();
    if (!summary) return;

    console.log('\n📊 [Performance Summary]');
    console.log(`Total Components Loaded: ${summary.totalComponents}`);
    console.log(`Total Load Time: ${summary.totalDuration}ms`);
    console.log(`Average Load Time: ${summary.avgDuration}ms`);
    console.log(`Slowest: ${summary.slowest.component} (${summary.slowest.duration}ms)`);
    console.log(`Fastest: ${summary.fastest.component} (${summary.fastest.duration}ms)\n`);
  }

  reset() {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Log summary when navigating away or closing
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    performanceMonitor.printSummary();
  });
}
