import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlowFieldBackgroundProps {
    className?: string;
    color?: string;
    trailOpacity?: number;
    particleCount?: number;
    speed?: number;
}

export default function FlowFieldBackground({
    className,
    color = "#6366f1",
    trailOpacity = 0.15,
    particleCount = 500,
    speed = 1,
}: FlowFieldBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let width = container.clientWidth;
        let height = container.clientHeight;
        let animationFrameId: number;

        // Pre-allocated TypedArrays for smooth performance
        const px = new Float32Array(particleCount);
        const py = new Float32Array(particleCount);
        const vx = new Float32Array(particleCount);
        const vy = new Float32Array(particleCount);
        const age = new Float32Array(particleCount);
        const life = new Float32Array(particleCount);
        const alphaArr = new Float32Array(particleCount);

        const initParticles = () => {
            for (let i = 0; i < particleCount; i++) {
                px[i] = Math.random() * width;
                py[i] = Math.random() * height;
                vx[i] = 0;
                vy[i] = 0;
                life[i] = Math.random() * 200 + 100;
                age[i] = Math.random() * life[i];
            }
        };

        const init = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for perf
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            initParticles();
        };

        const animate = () => {
            // Trail fade - exactly like original
            ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
            ctx.fillRect(0, 0, width, height);

            // Set the particle colour ONCE per frame (original colour, no change)
            ctx.fillStyle = color;

            // Update all particles and store their alphas
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.cos(px[i] * 0.005) + Math.sin(py[i] * 0.005)) * Math.PI;

                vx[i] += Math.cos(angle) * 0.2 * speed;
                vy[i] += Math.sin(angle) * 0.2 * speed;

                px[i] += vx[i];
                py[i] += vy[i];

                vx[i] *= 0.95;
                vy[i] *= 0.95;

                age[i]++;
                if (age[i] > life[i]) {
                    px[i] = Math.random() * width;
                    py[i] = Math.random() * height;
                    vx[i] = 0;
                    vy[i] = 0;
                    age[i] = 0;
                    life[i] = Math.random() * 200 + 100;
                }

                if (px[i] < 0) px[i] = width;
                if (px[i] > width) px[i] = 0;
                if (py[i] < 0) py[i] = height;
                if (py[i] > height) py[i] = 0;

                alphaArr[i] = 1 - Math.abs((age[i] / life[i]) - 0.5) * 2;
            }

            // Draw particles — only change globalAlpha when it actually differs
            // Round to 2 decimal places to avoid micro-changes triggering state updates
            let lastAlpha = -1;
            for (let i = 0; i < particleCount; i++) {
                const a = Math.round(alphaArr[i] * 20) / 20; // Quantise to 0.05 steps
                if (a !== lastAlpha) {
                    ctx.globalAlpha = a;
                    lastAlpha = a;
                }
                ctx.fillRect(px[i], py[i], 1.5, 1.5);
            }

            // Reset globalAlpha
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            init();
        };

        init();
        animate();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, trailOpacity, particleCount, speed]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-full bg-black overflow-hidden", className)}>
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
