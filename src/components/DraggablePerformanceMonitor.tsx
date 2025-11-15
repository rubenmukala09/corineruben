import { useState, useRef, useEffect } from "react";
import { X, Move } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DraggablePerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Monitor FPS
    let lastTime = performance.now();
    let frames = 0;
    
    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);

    // Monitor memory (if available)
    const updateMemory = () => {
      if ((performance as any).memory) {
        const used = (performance as any).memory.usedJSHeapSize / 1048576;
        setMemory(Math.round(used));
      }
    };
    
    const memoryInterval = setInterval(updateMemory, 1000);
    
    return () => clearInterval(memoryInterval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Calculate new position
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;
        
        // Get viewport dimensions
        const maxX = window.innerWidth - (cardRef.current?.offsetWidth || 200);
        const maxY = window.innerHeight - (cardRef.current?.offsetHeight || 150);
        
        // Constrain to viewport
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isVisible) return null;

  return (
    <Card
      ref={cardRef}
      className="fixed z-[45] bg-card/95 backdrop-blur-sm border-2 shadow-lg cursor-move select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-3 min-w-[180px]">
        {/* Header with drag handle */}
        <div className="flex items-center justify-between mb-2 drag-handle cursor-move">
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-xs font-semibold">Performance</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Metrics */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">FPS:</span>
            <span className={`font-mono font-semibold ${fps < 30 ? 'text-destructive' : fps < 50 ? 'text-yellow-600' : 'text-green-600'}`}>
              {fps}
            </span>
          </div>
          {memory > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Memory:</span>
              <span className="font-mono font-semibold">{memory} MB</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className={`font-semibold ${fps >= 50 ? 'text-green-600' : 'text-yellow-600'}`}>
              {fps >= 50 ? 'Good' : 'Fair'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
