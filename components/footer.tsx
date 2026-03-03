"use client";

import { MapPin } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import { NavLink } from "@/components/nav-link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale, setLocale, t } = useLocale();

  // Footer navigation items matching navbar structure
  const footerNavItems = [
    {
      label: t("nav.about"),
      href: "/about",
      children: [
        { label: t("nav.about_who"), href: "/about#who-we-are" },
        { label: t("nav.about_vision"), href: "/about#vision-mission" },
        { label: t("nav.about_values"), href: "/about#values" },
        { label: t("nav.about_how"), href: "/about#how-we-work" },
      ],
    },
    {
      label: t("nav.services"),
      href: "/services",
      children: [
        {
          label: t("nav.services_policy"),
          href: "/services#policy-research",
        },
        {
          label: t("nav.services_corporate"),
          href: "/services#corporate-consulting",
        },
        {
          label: t("nav.services_political"),
          href: "/services#political-consulting",
        },
      ],
    },
    {
      label: t("nav.insights"),
      href: "/insights",
      children: [
        { label: t("nav.insights_concern"), href: "/insights/concern" },
        { label: t("nav.insights_articles"), href: "/insights/commentaries" },
        { label: t("nav.insights_reports"), href: "/insights/working-paper" },
        { label: t("nav.insights_events"), href: "/insights?type=event" },
        { label: t("nav.insights_bulletin"), href: "/insights/bulletin" },
      ],
    },
  ];

  return (
    <footer className="bg-primary dark:bg-[#01172C] text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <NavLink href="/" className="inline-block mb-3">
              <span className="text-xl font-serif font-bold text-white">
                ACRC
              </span>
            </NavLink>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Aksara Cakra Research and Consulting
              <br />
              {t("footer.desc")}
            </p>
            {/* Address */}
            <div className="flex items-start gap-2 text-xs text-white/80">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>
                Jl. Tebet Barat Dalam II No.5
                <br />
                South Jakarta, Indonesia
              </span>
            </div>
          </div>

          {/* Navigation Columns - About, Services, Insights */}
          {footerNavItems.map((section) => (
            <div key={section.label}>
              <h3 className="mb-3">
                <NavLink
                  href={section.href}
                  className="text-xs font-semibold text-white hover:text-neutral-300 transition-colors"
                >
                  {section.label}
                </NavLink>
              </h3>
              <ul className="space-y-2">
                {section.children.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      className="text-xs text-white/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 pt-6">
          {/* Secondary Links & Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Secondary Links - Careers, Privacy Policy, Address & Contact */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <NavLink
                href="/careers"
                className="text-white/80 hover:text-white transition-colors"
                title={t("footer.careers")}
              >
                {t("footer.careers")}
              </NavLink>
              <NavLink
                href="/privacy-policy"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t("footer.privacy")}
              </NavLink>
              <NavLink
                href="/contact"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t("footer.address_contact")}
              </NavLink>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setLocale("id")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "id"
                    ? "text-neutral-900 bg-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                ID
              </button>
              <span className="text-neutral-600">/</span>
              <button
                onClick={() => setLocale("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "en"
                    ? "text-neutral-900 bg-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Copyright & Admin Link */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-white/60">
              © {currentYear} {t("footer.rights")}
            </p>
            <NavLink
              href="/admin"
              className="text-[10px] text-white/20 hover:text-white/60 transition-colors uppercase tracking-widest font-bold"
            >
              Admin Access
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
