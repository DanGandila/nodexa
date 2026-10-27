'use client';

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DISTANCE = 150;

/** The field is drawn in `signal`, the brand accent, rather than neutral ink. */
const SIGNAL = '47, 91, 234';

/**
 * Links sit well under the nodes they join — the dots carry the field, the
 * lines only imply the structure. Their alpha eases out by the square root of
 * remaining distance so the weight stays even across the range; a linear
 * falloff spends most of its span near zero, since far pairs outnumber near
 * ones, and leaves the longer lines looking washed out rather than quiet.
 */
const NODE_ALPHA = 0.3;
const LINK_ALPHA = 0.13;

/** Below this width the field thins out to suit a phone. */
const MOBILE_WIDTH = 640;

/** How far the field trails the page as it scrolls, as a fraction of scrollY. */
const PARALLAX = 0.18;

/**
 * A calm, drifting node field — the mark's own vocabulary at ambient scale.
 * Sits behind the hero copy at low opacity; renders a single static frame
 * when the visitor prefers reduced motion.
 */
export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scrolling lifts the field at a fraction of the page's own speed, which
  // gives the hero a shallow sense of depth as it leaves the viewport.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let ticking = false;

    function apply() {
      // Only worth transforming while the hero is still on screen.
      const offset = Math.min(window.scrollY, window.innerHeight) * PARALLAX;
      canvas!.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(apply);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    apply();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    function measure() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(): Node {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.4 + 1.1,
      };
    }

    function seed() {
      nodes = Array.from({ length: width < MOBILE_WIDTH ? 14 : 24 }, spawn);
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance >= LINK_DISTANCE) continue;

          ctx!.strokeStyle = `rgba(${SIGNAL}, ${
            LINK_ALPHA * Math.sqrt(1 - distance / LINK_DISTANCE)
          })`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(nodes[j].x, nodes[j].y);
          ctx!.stroke();
        }
      }

      ctx!.fillStyle = `rgba(${SIGNAL}, ${NODE_ALPHA})`;
      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    /**
     * Mobile browsers fire `resize` as the URL bar retracts on scroll — often
     * without the hero's box changing at all. Re-seeding on those events made
     * the whole field teleport, so a resize now has to be real, and when it is
     * the field is carried across the new box rather than drawn afresh.
     */
    function onResize() {
      const rect = parent!.getBoundingClientRect();
      if (rect.width === width && rect.height === height) return;

      const prevWidth = width;
      const prevHeight = height;
      measure();

      if (prevWidth > 0 && prevHeight > 0) {
        const scaleX = width / prevWidth;
        const scaleY = height / prevHeight;
        for (const node of nodes) {
          node.x *= scaleX;
          node.y *= scaleY;
        }
      }

      // Crossing the breakpoint changes the population; top up or trim it
      // in place so the nodes already on screen keep their arrangement.
      const wanted = width < MOBILE_WIDTH ? 14 : 24;
      while (nodes.length > wanted) nodes.pop();
      while (nodes.length < wanted) nodes.push(spawn());

      if (reduced) draw();
    }

    measure();
    seed();
    if (reduced) {
      draw();
    } else {
      frame = requestAnimationFrame(step);
    }

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="animate-fade-in pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
