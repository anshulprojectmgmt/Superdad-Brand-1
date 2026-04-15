import { useEffect, useRef, useState } from "react";
import AudioSampleCta from "./components/AudioSampleCta";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type Product =
  | {
      title: string;
      description: string;
      buttonLabel: string;
      href: string;
      mediaType: "audiobook";
      mediaSrc: string;
      sampleTitle: string;
      isComingSoon?: false;
    }
  | {
      title: string;
      description: string;
      buttonLabel: string;
      href: string;
      mediaType: "image";
      mediaSrc: string;
      mediaAlt: string;
      isComingSoon?: false;
    }
  | {
      title: string;
      description: string;
      buttonLabel: string;
      href: string;
      mediaType: "video";
      mediaSrc: string;
      isComingSoon: true;
    };

const MOBILE_HERO_ASSET = {
  width: 800,
  height: 1328,
};

const DESKTOP_HERO_ASSET = {
  width: 1536,
  height: 688,
};

const HERO_GAP_PX = 4;
const HERO_HEADING_REVEAL = "clamp(56px, 8vw, 88px)";
const MOBILE_FOLD_HEIGHT_PX = 826;
const DESKTOP_HEADING_BOX_HEIGHT_PX = 176;

const estimateHeroImageBottom = (viewportWidth: number, viewportHeight: number) => {
  const isDesktop = viewportWidth >= 768;
  const topOffset = isDesktop ? 96 : 80;
  const asset = isDesktop ? DESKTOP_HERO_ASSET : MOBILE_HERO_ASSET;
  const availableHeight = isDesktop
    ? viewportHeight - topOffset - DESKTOP_HEADING_BOX_HEIGHT_PX
    : viewportHeight - topOffset;
  const scale = Math.min(viewportWidth / asset.width, availableHeight / asset.height);

  return Math.round(topOffset + asset.height * scale);
};

export default function App() {
  const talkypieVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroFrameRef = useRef<HTMLDivElement | null>(null);
  const heroArtworkRef = useRef<HTMLPictureElement | null>(null);
  const [isTalkypieMuted, setIsTalkypieMuted] = useState(true);
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 768,
  );
  const [heroImageBottom, setHeroImageBottom] = useState(() =>
    typeof window === "undefined" ? 0 : estimateHeroImageBottom(window.innerWidth, window.innerHeight),
  );

  const products: Product[] = [
    {
      title: "Audiobook",
      description:
        "Create bedtime stories for your kid automated in your own voice",
      buttonLabel: "Open Audiobook",
      href: "https://audiobooks.superdad.tech/",
      mediaType: "audiobook",
      mediaSrc: "/assets/magic-bansuri.mp3",
      sampleTitle: "Sample story - The Magic Bansuri",
    },
    {
      title: "Storybook",
      description:
        "Surprise your child by making them the main character in their very own storybook",
      buttonLabel: "Open Storybook",
      href: "https://storybook.superdad.tech/",
      mediaType: "image",
      mediaSrc: "/assets/Cinderella.png",
      mediaAlt: "Storybook preview",
    },
    {
      title: "Talkypie",
      description:
        "A collection of AI-powered soft toys that talk in their own character voices, creating warm, playful conversations kids love.",
      buttonLabel: "Coming Soon",
      href: "#",
      mediaType: "video",
      mediaSrc: "/assets/Demo-video.mp4",
      isComingSoon: true,
    },
  ];

  const handleTalkypieMuteToggle = () => {
    const nextMutedState = !isTalkypieMuted;

    setIsTalkypieMuted(nextMutedState);

    if (talkypieVideoRef.current) {
      talkypieVideoRef.current.muted = nextMutedState;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !heroFrameRef.current || !heroArtworkRef.current) {
      return undefined;
    }

    const heroFrame = heroFrameRef.current;
    const heroArtwork = heroArtworkRef.current;
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const updateHeroImageBottom = () => {
      const rect = heroArtwork.getBoundingClientRect();
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const asset = isDesktop ? DESKTOP_HERO_ASSET : MOBILE_HERO_ASSET;
      const scale = Math.min(rect.width / asset.width, rect.height / asset.height);
      const nextBottom = Math.round(rect.top + asset.height * scale);

      setIsDesktopViewport(isDesktop);
      setHeroImageBottom((current) => (Math.abs(current - nextBottom) <= 1 ? current : nextBottom));
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateHeroImageBottom);
    };

    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate);

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(heroFrame);
      resizeObserver.observe(heroArtwork);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f8f7f5] text-on-surface selection:bg-tertiary-fixed selection:text-on-tertiary-container">
      <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/60 shadow-sm backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 font-['Plus_Jakarta_Sans'] leading-relaxed md:px-12">
          <div className="flex items-center gap-2">
            <div className="rounded-[1.1rem] bg-[#f9f3ea] p-2 shadow-[0_14px_30px_rgba(48,41,80,0.1)] ring-1 ring-[#e7dccd]">
              <img
                src="/assets/superdad-header-logo.png"
                alt="SuperDad logo"
                className="h-11 w-11 rounded-[0.8rem] object-contain md:h-12 md:w-12"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-orange-800">
              SuperDad
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              className="font-semibold text-orange-900 transition-all duration-300"
              href="#"
            >
              Home
            </a>
            <a
              className="text-slate-800 transition-all duration-300 hover:text-orange-600"
              href="#"
            >
              Stories
            </a>
            <a
              className="text-slate-800 transition-all duration-300 hover:text-orange-600"
              href="#"
            >
              Archive
            </a>
          </div>
        </nav>
      </header>

      <div
        ref={heroFrameRef}
        className="pointer-events-none fixed inset-x-0 bottom-0 top-20 z-0 overflow-hidden bg-[#f8efe1] md:top-24"
      >
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(min-width: 768px)" srcSet="/assets/desktopsuperdad.png" />
          <img
            src="/assets/Mobilesuperdad.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-115 object-cover object-center opacity-55 blur-2xl md:scale-105"
          />
        </picture>

        <picture
          ref={heroArtworkRef}
          className="relative block h-full w-full"
          style={{
            height: isDesktopViewport ? `calc(100% - ${DESKTOP_HEADING_BOX_HEIGHT_PX}px)` : "100%",
          }}
        >
          <source media="(min-width: 768px)" srcSet="/assets/desktopsuperdad.png" />
          <img
            src="/assets/Mobilesuperdad.png"
            alt="SuperDad Hero"
            className="h-full w-full object-contain object-top"
          />
        </picture>
      </div>

      <main className="relative z-10">
        <section
          aria-hidden="true"
          className="relative w-full"
          style={{ height: isDesktopViewport ? `${heroImageBottom}px` : `${MOBILE_FOLD_HEIGHT_PX}px` }}
        />

        <section
          className="relative flex items-end justify-center border-t border-white/20 bg-white/72 px-6 pb-4 shadow-[0_-18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl md:flex md:items-center md:justify-center md:px-12 md:pb-0"
          style={{
            marginTop: isDesktopViewport ? "0px" : `calc(-1 * ${HERO_HEADING_REVEAL})`,
            minHeight: isDesktopViewport
              ? `${DESKTOP_HEADING_BOX_HEIGHT_PX}px`
              : `calc(${MOBILE_FOLD_HEIGHT_PX}px - ${heroImageBottom}px + ${HERO_HEADING_REVEAL})`,
            paddingTop: isDesktopViewport ? "0px" : `${HERO_GAP_PX}px`,
          }}
        >
          <div className="mx-auto flex min-h-full max-w-7xl items-end justify-center text-center md:items-center md:pb-0">
            <div className="max-w-2xl md:max-w-5xl">
              <h2 className="text-[2.15rem] font-bold leading-[1.08] tracking-[0.02em] text-on-surface md:hidden">
                Our Joyful
                <br />
                <span className="text-orange-700">Creations</span>
              </h2>
              <h2 className="hidden font-bold leading-[0.9] tracking-[0.03em] text-on-surface md:block md:text-[4.6rem] lg:text-[5.4rem]">
                <span className="block">Our Joyful</span>
                <span className="block text-orange-700">Creations</span>
              </h2>
            </div>
          </div>
        </section>

        <section className="relative bg-white/72 px-6 pb-32 pt-0 backdrop-blur-xl md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {products.map((product) => (
                <div
                  key={product.title}
                  className="group flex flex-col rounded-xl border border-white/50 bg-white/90 p-8 shadow-lg transition-all duration-400 hover:shadow-2xl backdrop-blur-sm"
                >
                  <h3 className="mb-2 text-center text-2xl font-extrabold tracking-tight text-on-surface md:text-[1.7rem]">
                    {product.title}
                  </h3>
                  <p className="mx-auto mb-6 max-w-[30ch] text-center text-sm leading-relaxed text-on-surface-variant md:text-[0.97rem]">
                    {product.description}
                  </p>

                  <div
                    className={`relative mb-6 overflow-hidden rounded-lg bg-white ${
                      product.mediaType === "audiobook" ? "" : "aspect-4/3"
                    }`}
                  >
                    {product.mediaType === "audiobook" ? (
                      <AudioSampleCta
                        title={product.sampleTitle}
                        src={product.mediaSrc}
                      />
                    ) : null}

                    {product.mediaType === "image" ? (
                      <img
                        alt={product.mediaAlt}
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        src={product.mediaSrc}
                      />
                    ) : null}

                    {product.mediaType === "video" ? (
                      <>
                        <video
                          ref={talkypieVideoRef}
                          className="h-full w-full object-contain bg-slate-100 transition-transform duration-700 group-hover:scale-105"
                          src={product.mediaSrc}
                          autoPlay
                          muted={isTalkypieMuted}
                          loop
                          playsInline
                          preload="metadata"
                          aria-label="Talkypie preview"
                        />
                        <button
                          type="button"
                          onClick={handleTalkypieMuteToggle}
                          className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-tertiary shadow-sm backdrop-blur-md transition hover:bg-white"
                        >
                          {isTalkypieMuted ? "Unmute" : "Mute"}
                        </button>
                      </>
                    ) : null}
                  </div>

                  {product.isComingSoon ? (
                    <div className="mt-auto flex w-full items-center justify-center rounded-xl border-2 border-tertiary/60 py-4 text-center font-bold text-tertiary/80">
                      {product.buttonLabel}
                    </div>
                  ) : (
                    <a
                      className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border-2 border-tertiary py-4 font-bold text-tertiary transition-all duration-300 hover:bg-tertiary hover:text-on-tertiary"
                      href={product.href}
                    >
                      {product.buttonLabel}
                      <span className="material-symbols-outlined text-sm">
                        open_in_new
                      </span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-white/40 py-24 backdrop-blur-lg">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span
              className="material-symbols-outlined mb-8 text-6xl text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <blockquote className="mb-8 text-3xl font-semibold italic leading-tight text-on-secondary-fixed md:text-4xl">
              "The greatest legacy one can pass on to one's children and
              grandchildren is not money or other material things, but rather a
              legacy of character and faith."
            </blockquote>
            <cite className="not-italic text-lg font-bold uppercase tracking-widest text-tertiary">
              - Billy Graham
            </cite>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/20 bg-white/80 py-12 font-['Plus_Jakarta_Sans'] text-sm tracking-wide backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 md:flex-row md:px-24">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-lg font-bold text-slate-900">SuperDad</span>
            <p className="text-slate-600">
              &copy; superdad.tech. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              className="text-slate-600 transition-colors duration-200 hover:text-orange-500"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-slate-600 transition-colors duration-200 hover:text-orange-500"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-slate-600 transition-colors duration-200 hover:text-orange-500"
              href="#"
            >
              Contact Us
            </a>
            <a
              className="text-slate-600 transition-colors duration-200 hover:text-orange-500"
              href="#"
            >
              Our Story
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
