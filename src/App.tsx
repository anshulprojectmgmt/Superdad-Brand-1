/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="text-on-surface selection:bg-tertiary-fixed selection:text-on-tertiary-container">
      {/* Top Navigation Shell */}
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] leading-relaxed">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-700" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
            <span className="text-2xl font-bold tracking-tight text-orange-800">SuperDad</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-orange-900 font-semibold transition-all duration-300" href="#">Home</a>
            <a className="text-slate-800 hover:text-orange-600 transition-all duration-300" href="#">Stories</a>
            <a className="text-slate-800 hover:text-orange-600 transition-all duration-300" href="#">Archive</a>
          </div>
          {/* Get Started button removed as requested */}
        </nav>
      </header>

      {/* Fixed Background Image for Overlay Animation */}
      <div className="fixed inset-0 z-[-1] bg-[#f8f7f5] pt-24 pb-8">
        <img 
          src="https://lh3.googleusercontent.com/aida/ADBb0uhtRLIYxrcyTTYbVlPh4k1ezOCqYqNoq2h3EyxebtxciQXc8oTyWeWw_8eyzt5u4_BQjBLXqpgnFFfsTXk2-pf6e0zbOLGP8EsKYyEBbMjD_yG5T46rkvWeMEbe4LY0WyQd1cFStudpqpuadhFFw2nWg7YmKMiYR8ANXwBNqLb0DnFqlsFVOu0JqnwcUXKlLw2-JspLCBIuHRU3cU3NFNOMu5f9ywvJQH_g7OTUim2BZFBxkevVJT2ufQyLYJIyEGzGdbNJ5YyTog0" 
          alt="SuperDad Hero" 
          className="w-full h-full object-contain object-top"
        />
      </div>

      <main>
        {/* Hero Spacer */}
        <section className="relative w-full h-[70vh] flex items-center justify-center">
          {/* Transparent spacer to reveal the fixed background and allow Joyful Creations to peek from the bottom */}
        </section>

        {/* Joyful Creations Section */}
        <section className="relative py-32 px-6 md:px-12 bg-white/70 backdrop-blur-md border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">Joyful Creations</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Every moment shared is a thread in the tapestry of their future. Discover tools crafted to turn simple interactions into lasting digital treasures.
                </p>
              </div>
              <div className="h-px flex-grow bg-outline-variant/30 mx-8 hidden md:block mb-4"></div>
              <div className="flex items-center gap-2 text-tertiary font-bold group cursor-pointer">
                <span className="text-sm tracking-widest uppercase">Explore All Templates</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Bento-Style Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Product Card 1 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 border border-white/50 flex flex-col p-8">
                <h3 className="text-xl font-bold text-on-surface mb-3">Midnight Fables</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  A curated collection of prompts and visual templates designed for late-night storytelling and deep bonding.
                </p>
                <div className="aspect-[4/3] overflow-hidden relative rounded-lg mb-6">
                  <img alt="Story Starter kit" className="w-full h-full transition-transform duration-700 group-hover:scale-105 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW4LGLltUn0CPPgTIsGOkjvA9Z90b6tRtg5_Xa_aP5JiUzw4vOG1tXNk3U_aiFT9rVXsamAd0-9xrTUtLrD0cihVAnfsRSx3P6ElH1CjWzP1z8ko6SuBn25B95TG8fEYVSs_PVXcayrEc3beilXMm4a4ve3w_LFQnUWlDMKmqdP3KMqGahHzLv8CzRjkXZv-f16e_h3MQagTSg4XJ3117-Cwxd_z6Gj4SqzNF6BV3F-BUfCY1rZU48Eq0lI5psixSn-38oHgzfQNoH"/>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-tertiary px-3 py-1 rounded-full text-xs font-bold shadow-sm">NEW</span>
                  </div>
                </div>
                <button className="w-full py-4 rounded-xl border-2 border-tertiary text-tertiary font-bold hover:bg-tertiary hover:text-on-tertiary transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                  Open Product
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>

              {/* Product Card 2 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 border border-white/50 flex flex-col p-8">
                <h3 className="text-xl font-bold text-on-surface mb-3">Legacy Archive</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Secure, long-term storage for voice recordings and videos, ensuring your perspective remains vivid for decades.
                </p>
                <div className="aspect-[4/3] overflow-hidden relative rounded-lg mb-6">
                  <img alt="Legacy Archive" className="w-full h-full transition-transform duration-700 group-hover:scale-105 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw_vmOVZP7aamqvaHkNCMqIHgMRd8gsn4r-ITGm-T-fqrkW1O6o1kyZu8-xuqwt_Zlz-JgmCblZIHy1g9_tMOs8jvLKi-qUYEAIUUZh6tLU0u2QcAegw_o44RJpUwQKF2gW86SsLW8GieXiNCvSp60eKEFSGrNj_Jc9KtP63gCRer95qbExb1wDCYXq-VNuXKdFJ2aWDFUXiHZDfWOc4McfI1dvD0Dn_3yuLl0L65Cz8on-btP4KvWtC3CfqGhXaLEJbk1mDo2q4WJ"/>
                </div>
                <button className="w-full py-4 rounded-xl border-2 border-tertiary text-tertiary font-bold hover:bg-tertiary hover:text-on-tertiary transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                  Open Product
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>

              {/* Product Card 3 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 border border-white/50 flex flex-col p-8">
                <h3 className="text-xl font-bold text-on-surface mb-3">Memory Maps</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Geospatial storytelling that pins your most important lessons to the places they were first learned.
                </p>
                <div className="aspect-[4/3] overflow-hidden relative rounded-lg mb-6">
                  <img alt="Memory Maps" className="w-full h-full transition-transform duration-700 group-hover:scale-105 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwQ5H87KA1akjEFwiCYIwlrSSNtS9iQZFKCt5aa4vwovNNrqjkKj2r0t25RrubpwLhw3pqkGVJmxFVHRyWsMGpqTVB2ZsoV7U10Dx--WR4wUEqYGmppttYdC-WbJNqBPHKPZeGKp3gv-CUIjtNyYyeqKAtxy-5yzRKeefUel-zOuUuCsMqO9DSn44vMYFG6uX45dmd4qaEiFJLlIgMQjtiBvdn9QSfhI-P6yOGUYibS47vZ0NrfYHjTeZXp2vu40_qMGqbNhJ_FUBd"/>
                </div>
                <button className="w-full py-4 rounded-xl border-2 border-tertiary text-tertiary font-bold hover:bg-tertiary hover:text-on-tertiary transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                  Open Product
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Signature Quote Section */}
        <section className="relative py-24 bg-white/40 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="material-symbols-outlined text-6xl text-primary mb-8" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <blockquote className="text-3xl md:text-4xl font-semibold text-on-secondary-fixed italic leading-tight mb-8">
              "The greatest legacy one can pass on to one's children and grandchildren is not money or other material things, but rather a legacy of character and faith."
            </blockquote>
            <cite className="text-lg font-bold text-tertiary uppercase tracking-widest not-italic">— Billy Graham</cite>
          </div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="w-full py-12 bg-white/80 backdrop-blur-md border-t border-white/20 font-['Plus_Jakarta_Sans'] text-sm tracking-wide">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-24 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-slate-900">SuperDad</span>
            <p className="text-slate-600">© 2024 SuperDad Digital Heirloom. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-slate-600 hover:text-orange-500 transition-colors duration-200" href="#">Privacy Policy</a>
            <a className="text-slate-600 hover:text-orange-500 transition-colors duration-200" href="#">Terms of Service</a>
            <a className="text-slate-600 hover:text-orange-500 transition-colors duration-200" href="#">Contact Us</a>
            <a className="text-slate-600 hover:text-orange-500 transition-colors duration-200" href="#">Our Story</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
