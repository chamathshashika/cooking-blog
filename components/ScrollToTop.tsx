"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {/* Outer pulsing ripple ring */}
      <span
        className="absolute inset-0 rounded-full bg-sage/60 animate-ping pointer-events-none"
        style={{ animationDuration: "2.5s" }}
        aria-hidden="true"
      />

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title="Scroll to top"
        className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-sage text-white shadow-lg border border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 hover:bg-sage/90 hover:scale-110 active:scale-95 animate-pulse hover:animate-none"
      >
        <ArrowUp className="h-5 w-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
