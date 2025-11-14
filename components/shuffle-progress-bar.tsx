'use client';

import { Pause, Play, Shuffle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ShuffleProgressBarProps {
  progress: number;
  isPaused?: boolean;
  onTogglePause?: () => void;
  onShuffle?: () => void;
}

export function ShuffleProgressBar({ progress, isPaused = false, onTogglePause, onShuffle }: ShuffleProgressBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-background/80 backdrop-blur-sm border-t-2 border-foreground">
        <div className="px-4 py-3 relative flex items-center gap-3">
          {onShuffle && (
            <button
              onClick={onShuffle}
              className="px-3 py-1 border-2 border-foreground rounded-sm bg-background hover:bg-accent transition-colors flex items-center gap-1.5 shrink-0"
              aria-label="Shuffle now"
            >
              <Shuffle size={14} />
              <span className="uppercase text-xs font-bold">SHUFFLE</span>
            </button>
          )}

          <div className="flex-1 relative">
            <Progress 
              value={progress}
              className={`h-4 border-2 border-foreground rounded-sm transition-opacity ${isPaused ? 'opacity-50' : 'bg-muted/20'}`}
            />
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="flex h-full">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 border-r border-foreground/10 last:border-r-0"
                  />
                ))}
              </div>
            </div>
          </div>

          {onTogglePause && (
            <button
              onClick={onTogglePause}
              className="px-3 py-1 border-2 border-foreground rounded-sm bg-background hover:bg-accent transition-colors flex items-center gap-1.5 shrink-0"
              aria-label={isPaused ? "Resume shuffle" : "Pause shuffle"}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
              <span className="uppercase text-xs font-bold">{isPaused ? 'PLAY' : 'PAUSE'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
