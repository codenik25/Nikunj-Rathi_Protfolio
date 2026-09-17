import React, { useEffect, useRef, useState } from 'react';

export const ArchiveActivityField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string; subtext: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = { x: -1000, y: -1000 };
    const targetMouse = { x: -1000, y: -1000 };

    // Cell configuration
    const cellSize = 28;
    const gap = 4;
    const totalCellSize = cellSize + gap;
    
    let cols = 0;
    let rows = 0;
    
    // We want a static matrix of values to represent "commits/activity"
    let activityMatrix: { baseVal: number, currentVal: number, phase: number, dateStr: string }[][] = [];

    const initCanvas = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      cols = Math.ceil(width / totalCellSize) + 1;
      rows = Math.ceil(height / totalCellSize) + 1;
      
      activityMatrix = Array(cols).fill(0).map((_, i) => 
        Array(rows).fill(0).map((_, j) => {
          // Generate a pseudo-random activity baseline that looks organic
          // Use sine waves to cluster activity
          const organic = (Math.sin(i * 0.2) + Math.cos(j * 0.2)) * 0.5;
          const noise = Math.random() * 0.5;
          let val = (organic + noise) * 0.8;
          if (val < 0.2) val = 0.05; // Base minimal opacity
          if (val > 1) val = 1;

          // Pseudo date logic for tooltip
          const d = new Date(2026, 0, 1);
          d.setDate(d.getDate() + (i * 7 + j));
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

          return {
            baseVal: val,
            currentVal: val,
            phase: Math.random() * Math.PI * 2,
            dateStr
          };
        })
      );
    };

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;

      // Tooltip logic
      const col = Math.floor(targetMouse.x / totalCellSize);
      const row = Math.floor(targetMouse.y / totalCellSize);
      
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        const cell = activityMatrix[col][row];
        const count = Math.floor(cell.baseVal * 15);
        if (count > 0) {
          setTooltip({
            x: e.clientX,
            y: e.clientY - 40,
            text: `${count} contributions`,
            subtext: cell.dateStr
          });
        } else {
          setTooltip(null);
        }
      } else {
        setTooltip(null);
      }
    };

    const handleMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
      setTooltip(null);
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    initCanvas();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth mouse follow
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      const time = performance.now() * 0.001;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cell = activityMatrix[i][j];
          const x = i * totalCellSize;
          const y = j * totalCellSize;
          
          // Calculate distance to mouse
          const dx = mouse.x - (x + cellSize / 2);
          const dy = mouse.y - (y + cellSize / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Wave effect from mouse
          const maxDist = 150;
          let hoverEffect = 0;
          if (dist < maxDist) {
            // Ripple wave based on distance
            const wave = Math.sin((dist / maxDist) * Math.PI * 2 - time * 5);
            hoverEffect = (1 - dist / maxDist) * 0.4 * (wave > 0 ? wave : 0);
          }

          // Very slow subtle breathing
          const breathe = Math.sin(time * 0.5 + cell.phase) * 0.05;
          
          // Target value
          const targetVal = Math.min(1, Math.max(0.02, cell.baseVal + breathe + hoverEffect));
          
          // Smooth easing towards target
          cell.currentVal += (targetVal - cell.currentVal) * 0.1;

          // Draw cell
          // Soft digital paper vibe: light opacity white/blue with subtle rounded corners
          ctx.beginPath();
          // Adjust color based on intensity
          // Low: very dark slate. High: subtle blue/violet.
          const intensity = cell.currentVal;
          if (intensity > 0.6) {
             ctx.fillStyle = `rgba(168, 85, 247, ${intensity * 0.4})`; // subtle violet
          } else if (intensity > 0.3) {
             ctx.fillStyle = `rgba(56, 189, 248, ${intensity * 0.3})`; // subtle blue
          } else {
             ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.1})`; // soft white
          }
          
          // If we are actively hovering near it, give it a tiny border
          if (dist < 40) {
            ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
            ctx.lineWidth = 1;
            ctx.roundRect(x, y, cellSize, cellSize, 4);
            ctx.stroke();
          }

          ctx.roundRect(x, y, cellSize, cellSize, 4);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#050811] to-[#020308]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair w-full h-full"
        style={{ touchAction: 'none' }}
      />
      
      {/* Portfolio Visualization Label */}
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-slate-500 uppercase tracking-widest pointer-events-none">
        Portfolio Activity Visualization
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div 
          className="fixed z-50 pointer-events-none px-3 py-2 bg-[#0a0f1a] border border-white/10 rounded shadow-xl transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-white text-xs font-bold mb-0.5">{tooltip.text}</div>
          <div className="text-slate-400 text-[10px] font-mono">{tooltip.subtext}</div>
        </div>
      )}
    </div>
  );
};
