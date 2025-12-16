"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SlideToVibeButtonProps {
  onUnlock: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function SlideToVibeButton({
  onUnlock,
  disabled = false,
  label = "slide to vibe",
  className,
}: SlideToVibeButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  
  const trackWidth = 260;
  const trackHeight = 64;
  const handleSize = 64;
  const padding = 0;
  
  const maxDrag = trackWidth - handleSize - padding;

  const textOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);
  const textX = useTransform(x, [0, maxDrag], [0, 20]);
  const arrowOpacity = useTransform(x, [0, 20], [1, 0]);

  function handleDragEnd() {
    setIsDragging(false);
    if (x.get() >= maxDrag - 10) {
      onUnlock();
    } else {
      animate(x, 0, { type: "spring", bounce: 0.4, duration: 0.5 });
    }
  }

  return (
    <div
      className={cn(
        "relative select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ width: trackWidth, height: trackHeight }}
    >
      <div className="absolute inset-0 rounded-full bg-secondary/30 border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] backdrop-blur-md" />

      <motion.div
        style={{ opacity: textOpacity, x: textX }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <div className="flex items-center gap-1 pl-8 mt-1">
          <span className="text-[13px] font-medium text-muted-foreground tracking-[0.2em] uppercase opacity-80">
            {label}
          </span>
          <motion.div style={{ opacity: arrowOpacity }}>
            <ChevronRight className="w-4 h-4 text-muted-foreground/60 animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-0 left-0 z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <div 
          style={{ width: handleSize, height: handleSize }} 
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full h-full drop-shadow-2xl filter hover:brightness-110 transition-all">
             <Image 
               src="/avatar/avatar.png"
               alt="handle"
               fill
               className="object-contain p-1"
               draggable={false}
               priority
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
}