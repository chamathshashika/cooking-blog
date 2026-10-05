"use client";

import { useState } from "react";

export default function SubscribeBanner() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section
      aria-label="Subscribe to newsletter"
      className="w-full bg-sunshine py-12 md:py-16 text-center"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
          Subscribe via email
        </p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
          Never miss a recipe
        </h2>
        <p className="mt-1 text-sm md:text-base font-display text-ink/80 max-w-lg mx-auto">
          Get weekly Sri Lankan dishes, family spice blends, and cooking tips delivered straight to your inbox.
        </p>

        {isSubmitted ? (
          <div className="mt-6 inline-block bg-white/90 px-6 py-3 font-ui text-sm font-semibold tracking-wide text-ink border border-sage/40">
            Thank you for subscribing! Check your inbox soon for delicious recipes.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row max-w-xl mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Your name"
              className="h-10 w-full sm:w-48 bg-white px-3.5 font-ui text-xs text-ink placeholder:text-muted/70 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-wider focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Your email address"
              className="h-10 w-full sm:w-64 bg-white px-3.5 font-ui text-xs text-ink placeholder:text-muted/70 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-wider focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <button
              type="submit"
              className="h-10 w-full sm:w-auto bg-sage px-7 font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-150 hover:bg-sage-dark focus:outline-none focus:ring-2 focus:ring-ink"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
