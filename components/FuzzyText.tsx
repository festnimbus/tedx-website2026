'use client'

import React, { useEffect, useRef, useCallback } from 'react';

interface FuzzyTextProps {
    children: React.ReactNode;
    fontSize?: number | string;
    fontWeight?: string | number;
    fontFamily?: string;
    color?: string;
    enableHover?: boolean;
    baseIntensity?: number;
    hoverIntensity?: number;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
    children,
    fontSize = 'clamp(2rem, 8vw, 8rem)',
    fontWeight = 900,
    fontFamily = 'inherit',
    color = '#fff',
    enableHover = true,
    baseIntensity = 0.18,
    hoverIntensity = 0.5
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const cleanupRef = useRef<(() => void) | null>(null);

    const initCanvas = useCallback(async () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Cancel any previous animation
        if (animationRef.current) {
            window.cancelAnimationFrame(animationRef.current);
        }
        if (cleanupRef.current) {
            cleanupRef.current();
        }

        // Wait for fonts to be ready
        if (document.fonts?.ready) {
            await document.fonts.ready;
        }

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // Get device pixel ratio for sharp rendering on high-DPI displays
        const dpr = Math.min(window.devicePixelRatio || 1, 3); // Cap at 3x to prevent memory issues

        const computedFontFamily =
            fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;

        const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
        let numericFontSize: number;
        if (typeof fontSize === 'number') {
            numericFontSize = fontSize;
        } else {
            // Measure actual computed font size
            const temp = document.createElement('span');
            temp.style.fontSize = fontSize;
            temp.style.visibility = 'hidden';
            temp.style.position = 'absolute';
            temp.style.pointerEvents = 'none';
            temp.textContent = 'M';
            document.body.appendChild(temp);
            const computedSize = window.getComputedStyle(temp).fontSize;
            numericFontSize = parseFloat(computedSize);
            document.body.removeChild(temp);
        }

        const text = React.Children.toArray(children).join('');

        // Create offscreen canvas for text rendering
        const offscreen = document.createElement('canvas');
        const offCtx = offscreen.getContext('2d');
        if (!offCtx) return;

        // Scale font for DPR
        const scaledFontSize = numericFontSize * dpr;
        const scaledFont = `${fontWeight} ${scaledFontSize}px ${computedFontFamily}`;

        offCtx.font = scaledFont;
        offCtx.textBaseline = 'alphabetic';
        const metrics = offCtx.measureText(text);

        const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
        const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
        const actualAscent = metrics.actualBoundingBoxAscent ?? scaledFontSize;
        const actualDescent = metrics.actualBoundingBoxDescent ?? scaledFontSize * 0.2;

        const textBoundingWidth = Math.ceil(actualLeft + actualRight);
        const tightHeight = Math.ceil(actualAscent + actualDescent);

        const extraWidthBuffer = 10 * dpr;
        const offscreenWidth = textBoundingWidth + extraWidthBuffer;

        offscreen.width = offscreenWidth;
        offscreen.height = tightHeight;

        const xOffset = extraWidthBuffer / 2;
        offCtx.font = scaledFont;
        offCtx.textBaseline = 'alphabetic';
        offCtx.fillStyle = color;
        offCtx.fillText(text, xOffset - actualLeft, actualAscent);

        const horizontalMargin = 50 * dpr;
        const verticalMargin = 0;

        // Set internal canvas resolution (scaled for DPR)
        const canvasWidth = offscreenWidth + horizontalMargin * 2;
        const canvasHeight = tightHeight + verticalMargin * 2;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Set CSS display size (actual visual size)
        const displayWidth = canvasWidth / dpr;
        const displayHeight = canvasHeight / dpr;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;

        // Reset transform and apply translation
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(horizontalMargin, verticalMargin);

        // Interactive area (in display coordinates)
        const interactiveLeft = (horizontalMargin + xOffset) / dpr;
        const interactiveTop = verticalMargin / dpr;
        const interactiveRight = interactiveLeft + textBoundingWidth / dpr;
        const interactiveBottom = interactiveTop + tightHeight / dpr;

        let isHovering = false;
        const fuzzRange = 30 * dpr;

        const run = () => {
            ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
            const intensity = isHovering ? hoverIntensity : baseIntensity;
            for (let j = 0; j < tightHeight; j++) {
                const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
                ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
            }
            animationRef.current = window.requestAnimationFrame(run);
        };

        run();

        const isInsideTextArea = (x: number, y: number) =>
            x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableHover) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            isHovering = isInsideTextArea(x, y);
        };

        const handleMouseLeave = () => {
            isHovering = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!enableHover) return;
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            isHovering = isInsideTextArea(x, y);
        };

        const handleTouchEnd = () => {
            isHovering = false;
        };

        if (enableHover) {
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseleave', handleMouseLeave);
            canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
            canvas.addEventListener('touchend', handleTouchEnd);
        }

        cleanupRef.current = () => {
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            if (enableHover) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
                canvas.removeEventListener('touchmove', handleTouchMove);
                canvas.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null;
        let resizeTimeout: NodeJS.Timeout | null = null;

        const handleResize = () => {
            // Debounce resize to prevent excessive re-renders
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                initCanvas();
            }, 100);
        };

        // Initialize canvas
        initCanvas();

        // Set up ResizeObserver for responsive behavior
        if (containerRef.current && typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(containerRef.current);
        }

        // Also listen for window resize (for orientation changes)
        window.addEventListener('resize', handleResize);

        return () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            window.removeEventListener('resize', handleResize);
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, [initCanvas]);

    return (
        <div ref={containerRef} style={{ display: 'inline-block', lineHeight: 0 }}>
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                }}
            />
        </div>
    );
};

export default FuzzyText;
