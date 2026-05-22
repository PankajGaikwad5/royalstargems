"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const topItems = [
  "FINE JEWELLERY",
  "HANDCRAFTED",
  "TIMELESS ELEGANCE",
  "RARE DIAMONDS",
  "EXQUISITE PIECES",
  "PURE LUXURY",
  "ARTISAN MADE",
  "CERTIFIED GEMS",
];

const bottomItems = [
  "SINCE 1995",
  "BESPOKE DESIGNS",
  "HEIRLOOM QUALITY",
  "FOREVER YOURS",
  "CRAFTED WITH CARE",
  "GOLD & DIAMONDS",
  "LUXURY DEFINED",
  "WORN WITH PRIDE",
];

function MarqueeTrack({ items, direction = "left" }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div
      className={`flex whitespace-nowrap ${
        direction === "left" ? "ticker-left" : "ticker-right"
      }`}
      style={{ width: "max-content" }}
    >
      {repeated.map((item, i) => (
        <span key={i} className="inline-flex items-center shrink-0 py-[10px]">
          <span className="text-white/35 mx-3 select-none leading-none h-[3px] w-100 bg-white"></span>
          <span className="text-white text-[10px] sm:text-[20px] font-medium tracking-[0.22em] uppercase select-none leading-none">
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function HeroSectionNew() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const topMarqueeRef = useRef(null);
  const titleRef = useRef(null);
  const bottomMarqueeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const bg = bgRef.current;
    const topMarquee = topMarqueeRef.current;
    const title = titleRef.current;
    const bottomMarquee = bottomMarqueeRef.current;

    // Shared state: both scroll + mouse write here; one tick applies combined
    const state = {
      scrollProgress: 0,
      mouseX: 0,
      mouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
    };

    let tickerActive = false;

    const tick = () => {
      if (!tickerActive) return;

      // Smooth mouse lerp
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.07;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.07;

      const p = state.scrollProgress;
      const mx = state.mouseX; // -0.5 to 0.5
      const my = state.mouseY;

      // BG moves slower than scroll (parallax depth) + subtle mouse drift
      gsap.set(bg, {
        x: mx * 22,
        y: p * 100 + my * 14,
      });

      // Title drifts counter to scroll + follows mouse lightly
      gsap.set(title, {
        x: mx * 9,
        y: p * -45 + my * 7,
      });
    };

    // ── Entrance: set hidden initial states ──────────────────────────────────
    gsap.set(bg, { scale: 1.1, opacity: 0 });
    gsap.set(topMarquee, { y: -40, opacity: 0 });
    gsap.set(title, { y: 80, opacity: 0 });
    gsap.set(bottomMarquee, { y: 40, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        tickerActive = true;
        gsap.ticker.add(tick);
      },
    });

    // Cinematic pull-back + staggered reveals
    tl.to(bg, { scale: 1, opacity: 1, duration: 1.8, ease: "power2.inOut" })
      .to(topMarquee, { y: 0, opacity: 1, duration: 0.9 }, 0.5)
      .to(title, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0.85)
      .to(bottomMarquee, { y: 0, opacity: 1, duration: 0.9 }, 1.1);

    // ── Scroll parallax (updates state only; tick applies it) ────────────────
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        state.scrollProgress = self.progress;
      },
    });

    // ── Mouse parallax ───────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      state.targetMouseX = e.clientX / window.innerWidth - 0.5;
      state.targetMouseY = e.clientY / window.innerHeight - 0.5;
    };

    section.addEventListener("mousemove", onMouseMove);

    return () => {
      tickerActive = false;
      gsap.ticker.remove(tick);
      section.removeEventListener("mousemove", onMouseMove);
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes ticker-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .ticker-left  { animation: ticker-left  40s linear infinite; }
        .ticker-right { animation: ticker-right 40s linear infinite; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full h-screen min-h-[560px] overflow-hidden bg-black"
      >
        {/* BG: oversized wrapper gives parallax + mouse movement headroom */}
        <div
          ref={bgRef}
          className="absolute will-change-transform"
          style={{ inset: "-6%" }}
        >
          <Image
            src="/blacknwhitelnd.png"
            alt="Royal Star Gems"
            fill
            priority
            className="object-cover object-center"
            sizes="112vw"
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.05) 38%, rgba(0,0,0,0.05) 62%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* TOP MARQUEE */}
        <div
          ref={topMarqueeRef}
          className="absolute top-15 left-0 right-0 z-10 overflow-hidden will-change-transform"
        >
          <MarqueeTrack items={topItems} direction="left" />
        </div>

        {/* HERO TITLE */}
        <div className="absolute inset-x-0 bottom-[150px] z-10 flex justify-end px-4 pointer-events-none">
          <h1
            ref={titleRef}
            className="text-white text-center italic leading-none text-6xl uppercase will-change-transform"
            style={{
              fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
              letterSpacing: "0.05em",
              fontWeight: 400,
              textShadow: "0 4px 40px rgba(0,0,0,0.45)",
            }}
          >
            Royal Star Gems
          </h1>
        </div>

        {/* BOTTOM MARQUEE */}
        <div
          ref={bottomMarqueeRef}
          className="absolute bottom-15 left-0 right-0 z-10 overflow-hidden will-change-transform"
        >
          <MarqueeTrack items={bottomItems} direction="right" />
        </div>
      </section>
    </>
  );
}
