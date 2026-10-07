"use client";

import React, { useEffect, useRef } from "react";

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    let particles: Particle[] = [];
    const mouse = { x: -999, y: -999 };
    let width = 0;
    let height = 0;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrameId: number;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Redimensionnement du canvas avec prise en compte du ratio d'écran
    const resize = () => {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      particles = [];
      const particleCount = Math.min(90, Math.floor(width / 12));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Suivi du curseur dans le conteneur parent
    const parent = canvas.parentElement;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    if (parent) {
      parent.addEventListener("pointermove", handlePointerMove);
      parent.addEventListener("pointerleave", handlePointerLeave);
    }

    // Boucle d'animation fluide
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Halo radial subtil suivant la souris
      if (mouse.x > -100 && mouse.y > -100) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
        if (isDark) {
          glow.addColorStop(0, "rgba(59, 130, 246, 0.22)");
          glow.addColorStop(1, "rgba(59, 130, 246, 0)");
        } else {
          glow.addColorStop(0, "rgba(30, 58, 138, 0.08)");
          glow.addColorStop(1, "rgba(30, 58, 138, 0)");
        }
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Mise à jour et rendu des particules
      particles.forEach((p, i) => {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Rebonds sur les bordures
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction avec la souris (légère répulsion)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && !reducedMotion) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        // Tracé du point
        if (isDark) {
          ctx.fillStyle = dist < 200 ? "#FFFFFF" : "rgba(184, 196, 224, 0.7)";
        } else {
          ctx.fillStyle = dist < 200 ? "#1E3A8A" : "rgba(30, 58, 138, 0.45)";
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, dist < 200 ? 2.6 : 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Lignes de connexion entre particules proches
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const distNodes = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);

          if (distNodes < 110) {
            const alpha = 0.35 * (1 - distNodes / 110);
            if (isDark) {
              ctx.strokeStyle = `rgba(148, 163, 200, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(30, 58, 138, ${alpha * 0.75})`;
            }
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (parent) {
        parent.removeEventListener("pointermove", handlePointerMove);
        parent.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
