"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setLoading(true);
    // Simulate brief network submission
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-ink/10 bg-linen/30 p-8 sm:p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl text-ink mb-2">Stuti! (Thank you)</h3>
        <p className="font-display text-sm text-ink/80 max-w-md mx-auto leading-relaxed mb-6">
          Your message has been sent to our kitchen. We read every note and will get back to you
          as soon as the pots are simmered down!
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", message: "" });
          }}
          className="inline-flex items-center gap-2 border border-ink/20 bg-white px-5 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:bg-cream transition-colors"
        >
          Send Another Note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-ink/10 bg-linen/20 p-6 sm:p-8">
      <div className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink mb-2"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="e.g. Anoma Perera"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-none border border-ink/20 bg-white py-2.5 px-3 font-ui text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="e.g. anoma@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-none border border-ink/20 bg-white py-2.5 px-3 font-ui text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            placeholder="Share a recipe question, culinary tip, or say hello..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-none border border-ink/20 bg-white py-2.5 px-3 font-ui text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage resize-y"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sage px-7 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage/90 transition-colors shadow-xs disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{loading ? "Sending..." : "Send Message"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
