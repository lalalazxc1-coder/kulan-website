"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Force normal blend mode as in original particles.js line 11
        canvas.style.mixBlendMode = "normal";

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const config = {
            // These will be set dynamically in the loop, but defaults match original class
            color: 'rgba(0, 51, 102, 0.15)',
            amount: 18,
            minSpeed: 0.1,
            maxSpeed: 0.3,
            minSize: 0.8,
            maxSize: 1.2,
        };

        class Part {
            x: number;
            y: number;
            vx: number;
            vy: number;
            scale: number;
            angle: number;
            vAngle: number;
            type: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * config.maxSpeed;
                this.vy = (Math.random() - 0.5) * config.maxSpeed;
                this.scale = Math.random() * (config.maxSize - config.minSize) + config.minSize;

                // Scale up slightly for visibility (from original line 86)
                this.scale = this.scale * 1.5;

                this.angle = Math.random() * Math.PI * 2;
                this.vAngle = (Math.random() - 0.5) * 0.01;

                // 0: Spark Plug, 1: Brake Pad, 2: Brake Disc, 3: Oil Can, 4: Barrel, 5: Battery
                this.type = Math.floor(Math.random() * 6);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.angle += this.vAngle;

                const buffer = 100;
                if (this.x < -buffer) this.x = w + buffer;
                if (this.x > w + buffer) this.x = -buffer;
                if (this.y < -buffer) this.y = h + buffer;
                if (this.y > h + buffer) this.y = -buffer;
            }

            draw(color: string) {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.scale(this.scale, this.scale);

                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                switch (this.type) {
                    case 0: this.drawSparkPlug(); break;
                    case 1: this.drawBrakePad(); break;
                    case 2: this.drawBrakeDisc(); break;
                    case 3: this.drawOilCan(); break;
                    case 4: this.drawBarrel(); break;
                    case 5: this.drawBattery(); break;
                }

                ctx.restore();
            }

            drawSparkPlug() {
                if (!ctx) return;
                // Insulator
                ctx.beginPath();
                ctx.rect(-4, -15, 8, 14);
                ctx.stroke();
                // Hex nut
                ctx.beginPath();
                ctx.rect(-6, -1, 12, 6);
                ctx.fill();
                // Thread
                ctx.beginPath();
                ctx.rect(-4, 5, 8, 10);
                ctx.stroke();
                // Electrode
                ctx.beginPath();
                ctx.moveTo(0, 15);
                ctx.lineTo(0, 20);
                ctx.moveTo(-4, 20);
                ctx.lineTo(2, 20);
                ctx.stroke();
                // Terminal
                ctx.beginPath();
                ctx.arc(0, -18, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            drawBrakePad() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(0, 0, 20, Math.PI * 1.1, Math.PI * 1.9);
                ctx.arc(0, 10, 14, Math.PI * 1.9, Math.PI * 1.1, true);
                ctx.closePath();
                ctx.stroke();
                // Lining
                ctx.beginPath();
                ctx.arc(0, 0, 17, Math.PI * 1.15, Math.PI * 1.85);
                ctx.stroke();
            }

            drawBrakeDisc() {
                if (!ctx) return;
                // Outer
                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, Math.PI * 2);
                ctx.stroke();
                // Inner
                ctx.beginPath();
                ctx.arc(0, 0, 6, 0, Math.PI * 2);
                ctx.stroke();
                // Vents
                for (let i = 0; i < 8; i++) {
                    ctx.save();
                    ctx.rotate((Math.PI * 2 * i) / 8);
                    ctx.beginPath();
                    ctx.arc(12, 0, 1, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            drawOilCan() {
                if (!ctx) return;
                // Body
                ctx.beginPath();
                ctx.rect(-10, -12, 20, 24);
                ctx.stroke();
                // Handle
                ctx.beginPath();
                ctx.moveTo(10, -8);
                ctx.lineTo(16, -4);
                ctx.lineTo(16, 8);
                ctx.lineTo(10, 12);
                ctx.stroke();
                // Spout
                ctx.beginPath();
                ctx.moveTo(-6, -12);
                ctx.lineTo(-12, -20);
                ctx.stroke();
                // Label
                ctx.beginPath();
                ctx.rect(-5, -5, 10, 10);
                ctx.stroke();
            }

            drawBarrel() {
                if (!ctx) return;
                // Body
                ctx.beginPath();
                ctx.rect(-10, -15, 20, 30);
                ctx.stroke();
                // Ribs
                ctx.beginPath();
                ctx.moveTo(-10, -5); ctx.lineTo(10, -5);
                ctx.moveTo(-10, 5); ctx.lineTo(10, 5);
                ctx.stroke();
                // Lid
                ctx.beginPath();
                ctx.ellipse(0, -15, 10, 3, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            drawBattery() {
                if (!ctx) return;
                // Body
                ctx.beginPath();
                ctx.rect(-14, -10, 28, 20);
                ctx.stroke();
                // Terminals
                ctx.beginPath();
                ctx.rect(-10, -14, 6, 4);
                ctx.fill();
                ctx.beginPath();
                ctx.rect(4, -14, 6, 4);
                ctx.fill();
                // Label
                ctx.beginPath();
                ctx.moveTo(-5, 0); ctx.lineTo(5, 0);
                ctx.stroke();
            }
        }

        const particles: Part[] = [];

        function init() {
            // Responsive amount
            const amount = w < 768 ? config.amount / 1.5 : config.amount;
            for (let i = 0; i < amount; i++) {
                particles.push(new Part());
            }
        }

        let animationFrameId: number;

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            // Check theme directly on document to be sync with next-themes update
            const isDark = document.documentElement.classList.contains('dark');
            const color = isDark ? 'rgba(147, 197, 253, 0.15)' : 'rgba(0, 51, 102, 0.15)';

            particles.forEach(p => {
                p.update();
                p.draw(color);
            });
            // NO LINES DRAWN AS PER ORIGINAL SPEC

            animationFrameId = requestAnimationFrame(animate);
        }

        init();
        animate();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            // Original doesn't re-init on resize if width is same, but here we just update w/h
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ zIndex: 0 }}
        />
    );
}
