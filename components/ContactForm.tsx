"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
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
      <div className="border border-ink/10 dark:border-hairline bg-linen/30 dark:bg-panel p-8 sm:p-10 text-center transition-colors duration-200">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 dark:bg-success/15 text-sage dark:text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl text-ink dark:text-ice mb-2">{t.contact.thankYou}</h3>
        <p className="font-display text-sm text-ink/80 dark:text-slate-muted max-w-md mx-auto leading-relaxed mb-6">
          {t.contact.thankYouDesc}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", message: "" });
          }}
          className="inline-flex min-h-[44px] items-center gap-2 border border-ink/20 dark:border-hairline bg-white dark:bg-surface px-6 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink dark:text-ice hover:bg-cream dark:hover:bg-panel transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          {t.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-ink/10 dark:border-hairline bg-linen/20 dark:bg-panel p-6 sm:p-8 transition-colors duration-200">
      <div className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink dark:text-ice mb-2"
          >
            {t.contact.yourName} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="e.g. Anoma Perera"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full min-h-[44px] rounded-none border border-ink/20 dark:border-hairline bg-white dark:bg-surface py-2.5 px-3.5 font-ui text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink dark:text-ice mb-2"
          >
            {t.contact.emailAddress} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="e.g. anoma@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full min-h-[44px] rounded-none border border-ink/20 dark:border-hairline bg-white dark:bg-surface py-2.5 px-3.5 font-ui text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink dark:text-ice mb-2"
          >
            {t.contact.message} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-none border border-ink/20 dark:border-hairline bg-white dark:bg-surface py-2.5 px-3.5 font-ui text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary resize-y"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center gap-2 bg-sage dark:bg-amber-primary px-8 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage-dark dark:hover:bg-amber-secondary transition-colors shadow-xs disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{loading ? t.contact.sending : t.contact.sendMessage}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
