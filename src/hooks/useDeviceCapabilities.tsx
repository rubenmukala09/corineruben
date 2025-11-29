import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isLowEnd: boolean;
  hasSlowConnection: boolean;
  prefersReducedMotion: boolean;
  cpuCores: number;
  deviceMemory: number;
}

export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    hasSlowConnection: false,
    prefersReducedMotion: false,
    cpuCores: 4,
    deviceMemory: 4,
  });

  useEffect(() => {
    // Check CPU cores
    const cpuCores = (navigator as any).hardwareConcurrency || 4;
    
    // Check device memory (in GB)
    const deviceMemory = (navigator as any).deviceMemory || 4;
    
    // Check connection speed
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const hasSlowConnection = connection ? 
      (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g' || 
       connection.effectiveType === '3g' ||
       connection.saveData === true) : false;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Determine if device is low-end
    // Low-end: <= 2 CPU cores OR <= 2GB RAM OR slow connection
    const isLowEnd = cpuCores <= 2 || deviceMemory <= 2 || hasSlowConnection;

    setCapabilities({
      isLowEnd,
      hasSlowConnection,
      prefersReducedMotion,
      cpuCores,
      deviceMemory,
    });
  }, []);

  return capabilities;
};
