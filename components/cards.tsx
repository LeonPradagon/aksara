"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  href?: string;
  featured?: boolean;
  onClick?: () => void;
}

export function ArticleCard({
  title,
  excerpt,
  date,
  category,
  image,
  href = "#",
  featured = false,
  onClick,
}: ArticleCardProps) {
  const Component = onClick ? "button" : "a";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "publication-card group flex flex-col",
        featured && "col-span-1 md:col-span-2 lg:col-span-2",
      )}
    >
      {image && (
        <div className="relative overflow-hidden bg-muted h-56 md:h-64 flex-shrink-0">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block text-xs font-semibold px-3 py-1.5 bg-muted text-muted-foreground rounded-full uppercase tracking-wide">
            {category}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {date}
          </span>
        </div>
        <h3
          className={cn(
            "font-serif font-bold mb-3 group-hover:text-primary transition-colors",
            featured
              ? "text-2xl md:text-3xl leading-tight"
              : "text-xl leading-snug",
          )}
        >
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>
      </div>
    </Component>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="flex gap-5 p-6 md:p-8 rounded-lg border border-border hover:border-primary/40 hover:shadow-md transition-all group bg-card">
      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface SectorCardProps {
  title: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
}

export function SectorCard({
  title,
  description,
  href,
  icon,
}: SectorCardProps) {
  const CardContent = (
    <div className="p-6 md:p-8 rounded-lg bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group cursor-pointer h-full">
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
      <h3 className="font-serif font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

interface TeamMemberCardProps {
  name: string;
  title: string;
  expertise: string[];
  image?: string;
}

export function TeamMemberCard({
  name,
  title,
  expertise,
  image,
}: TeamMemberCardProps) {
  return (
    <div className="publication-card flex flex-col">
      {image && (
        <div className="relative h-56 overflow-hidden bg-muted flex-shrink-0">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <h3 className="font-serif font-bold text-lg text-foreground mb-1">
          {name}
        </h3>
        <p className="text-sm text-primary font-semibold mb-4">{title}</p>
        <div className="flex flex-wrap gap-2">
          {expertise.map((exp) => (
            <span
              key={exp}
              className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-full font-medium"
            >
              {exp}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
