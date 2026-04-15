import { useEffect, useRef, useState, type TouchEvent } from "react";
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

const TESTIMONIALS = [
  {
    quote:
      "The bedtime stories feel personal and calm. My daughter now asks for SuperDad before she sleeps.",
    name: "Riya S.",
    role: "Mom of a 5-year-old",
  },
  {
    quote:
      "The voice-based audiobook idea is brilliant. It turned our nightly routine into something we genuinely look forward to.",
    name: "Aman K.",
    role: "Dad of two",
  },
  {
    quote:
      "Storybook and Audiobook both feel warm and thoughtful. It is one of the few kids products that really feels made for families.",
    name: "Neha P.",
    role: "Parent reviewer",
  },
];

const TESTIMONIAL_SWIPE_THRESHOLD_PX = 48;

export default function App() {
  const talkypieVideoRef = useRef<HTMLVideoElement | null>(null);
  const testimonialTouchStartXRef = useRef<number | null>(null);
  const [isTalkypieMuted, setIsTalkypieMuted] = useState(true);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

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

  const showNextTestimonial = () => {
    setActiveTestimonialIndex(
      (current) => (current + 1) % TESTIMONIALS.length,
    );
  };

  const showPreviousTestimonial = () => {
    setActiveTestimonialIndex(
      (current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const handleTestimonialTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    testimonialTouchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTestimonialTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = testimonialTouchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX ?? null;

    testimonialTouchStartXRef.current = null;

    if (startX === null || endX === null) {
      return;
    }

    const deltaX = endX - startX;

    if (Math.abs(deltaX) < TESTIMONIAL_SWIPE_THRESHOLD_PX) {
      return;
    }

    if (deltaX < 0) {
      showNextTestimonial();
      return;
    }

    showPreviousTestimonial();
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      showNextTestimonial();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
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

      <div className="pointer-events-none fixed inset-x-0 bottom-0 top-20 z-0 overflow-hidden bg-[#f8efe1] md:top-24">
        <picture className="absolute inset-0 block h-full w-full">
          <source
            media="(min-width: 768px)"
            srcSet="/assets/desktopsuperdad.png"
          />
          <img
            src="/assets/Mobilesuperdad.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-115 object-cover object-center opacity-55 blur-2xl md:scale-105"
          />
        </picture>

        <picture className="relative block h-[calc(100%-124px)] w-full md:h-[calc(100%-176px)]">
          <source
            media="(min-width: 768px)"
            srcSet="/assets/desktopsuperdad.png"
          />
          <img
            src="/assets/Mobilesuperdad.png"
            alt="SuperDad Hero"
            className="h-full w-full object-contain object-top"
          />
        </picture>
      </div>

      <main className="relative z-10">
        <section className="relative h-[100svh]">
          <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-white/72 px-6 shadow-[0_-18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-12">
            <div className="mx-auto flex h-[124px] max-w-7xl items-end justify-center pb-4 text-center md:h-[176px] md:items-center md:pb-0">
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
                  <p className="mx-auto mb-6 max-w-[30ch] text-center text-[1.1rem] font-[700] leading-relaxed text-on-surface-variant md:text-[0.97rem] md:font-normal">
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
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-tertiary">
                Testimonials
              </p>
            </div>

            <div
              className="select-none rounded-2xl border border-white/60 bg-white/88 p-8 text-center shadow-lg backdrop-blur-sm"
              aria-live="polite"
              onTouchStart={handleTestimonialTouchStart}
              onTouchEnd={handleTestimonialTouchEnd}
              onTouchCancel={() => {
                testimonialTouchStartXRef.current = null;
              }}
              style={{ touchAction: "pan-y" }}
            >
              <p className="text-2xl font-semibold leading-relaxed text-on-secondary-fixed md:text-3xl">
                "{TESTIMONIALS[activeTestimonialIndex].quote}"
              </p>
              <div className="mt-6">
                <p className="text-base font-bold text-on-surface">
                  {TESTIMONIALS[activeTestimonialIndex].name}
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {TESTIMONIALS[activeTestimonialIndex].role}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {TESTIMONIALS.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActiveTestimonialIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={index === activeTestimonialIndex}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-white ${
                      index === activeTestimonialIndex
                        ? "w-7 bg-orange-600"
                        : "w-2.5 bg-orange-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/20 bg-white/80 py-12 font-['Plus_Jakarta_Sans'] text-[1.1rem] font-semibold tracking-wide backdrop-blur-md">
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
