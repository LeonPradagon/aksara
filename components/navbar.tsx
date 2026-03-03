"use client";

import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";
import { NavLink } from "@/components/nav-link";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// navItems moved inside Navbar component to access translation

function DropdownMenu({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!item.children) {
    return (
      <NavLink
        href={item.href}
        className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        href={item.href}
        className={cn(
          "inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary",
          isOpen && "text-primary border-primary",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")}
        />
      </NavLink>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
          {item.children.map((child) => (
            <NavLink
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted transition-colors"
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // FIX 1: Add mounted state
  const { locale, toggleLocale, t } = useLocale();
  const { theme, setTheme } = useTheme();

  const navItems: NavItem[] = [
    { label: t("nav.home"), href: "/" },
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
          href: "/services/policy-research",
        },
        {
          label: t("nav.services_corporate"),
          href: "/services/corporate-consulting",
        },
        {
          label: t("nav.services_political"),
          href: "/services/political-consulting",
        },
      ],
    },
    {
      label: t("nav.issues"),
      href: "/issues",
      children: [
        { label: t("nav.issues_defence"), href: "/issues/defence-security" },
        {
          label: t("nav.issues_politics"),
          href: "/issues/politics-governance",
        },
        { label: t("nav.issues_economy"), href: "/issues/economy-business" },
        {
          label: t("nav.issues_elections"),
          href: "/issues/elections-democracy",
        },
        { label: t("nav.issues_esg"), href: "/issues/esg-sustainability" },
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
    {
      label: t("nav.team"),
      href: "/team",
      children: [
        { label: t("nav.team_leadership"), href: "/team#leadership" },
        { label: t("nav.team_researchers"), href: "/team#researchers" },
        // { label: t("nav.team_advisory"), href: "/team#advisory" },
      ],
    },
    { label: t("nav.contact"), href: "/contact" },
  ];

  // FIX 2: Set mounted to true only after component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileSubmenu = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavLink
            href="/"
            className="flex-shrink-0 group flex items-center gap-3"
          >
            {/* Logic: Cek apakah sudah mounted & tema apa yang aktif */}
            <img
              src={
                mounted && theme === "dark"
                  ? "/picture/Logo ACRC 3.png"
                  : "/picture/Logo ACRC 1.png"
              }
              alt="ACRC Logo"
              className="h-15 w-auto transition-transform duration-300 group-hover:scale-105"
            />

            <div>
              {/* <p className="text-xs text-muted-foreground tracking-wide">
                Navigator of Nusantara's Policy
              </p> */}
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <DropdownMenu key={item.href} item={item} onClose={() => {}} />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "EN" : "ID"}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {/* FIX 3: Conditionally render icons based on mounted state */}
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )
              ) : (
                // Placeholder to prevent layout shift
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          expandedItem === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    {expandedItem === item.label && (
                      <div className="bg-muted/50 border-l-2 border-primary ml-4">
                        <NavLink
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Overview
                        </NavLink>
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Mobile Language Switcher */}
            <div className="px-4 py-3 border-t border-border mt-2">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{t("nav.switch_lang")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
