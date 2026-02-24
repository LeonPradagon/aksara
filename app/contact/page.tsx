"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import Swal from "sweetalert2";

export default function ContactPage() {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Show loading alert
    Swal.fire({
      title: "Sending...",
      text: "Please wait while we process your message.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("http://localhost:5342/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      // Close loading and show success
      Swal.fire({
        title: "Success!",
        text: t("contact.success_message"),
        icon: "success",
        confirmButtonColor: "#01172C",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        inquiryType: "",
        message: "",
      });
    } catch (err: any) {
      console.error(err);
      // Close loading and show error
      Swal.fire({
        title: "Error!",
        text: err.message || "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#01172C",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                {t("contact.info_title")}
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("contact.office_address")}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Aksara Cakra Research and Consulting (ACRC)
                        <br />
                        Jl. Tebet Barat Dalam II No.5
                        <br />
                        South Jakarta
                        <br />
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("contact.phone")}
                      </h3>
                      <p className="text-muted-foreground text-sm italic">
                        {t("contact.to_be_added")}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("contact.email")}
                      </h3>
                      <p className="text-muted-foreground text-sm italic">
                        {t("contact.to_be_added")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("contact.quick_links")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/services"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {t("nav.services")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insights"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {t("nav.insights")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {t("nav.team")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-lg p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  {t("contact.message_title")}
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("contact.name")}{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t("contact.name_placeholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("contact.org")}{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="organization"
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t("contact.org_placeholder")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("contact.email")}{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t("contact.email_placeholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("contact.phone_label")}{" "}
                        <span className="text-muted-foreground text-xs">
                          {t("contact.phone_optional")}
                        </span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+62"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t("contact.inquiry_type")}{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">{t("contact.select_inquiry")}</option>
                      <option value="government">
                        {t("contact.inquiry_gov")}
                      </option>
                      <option value="soes">{t("contact.inquiry_soes")}</option>
                      <option value="private">
                        {t("contact.inquiry_private")}
                      </option>
                      <option value="political">
                        {t("contact.inquiry_political")}
                      </option>
                      <option value="international">
                        {t("contact.inquiry_intl")}
                      </option>
                      <option value="other">
                        {t("contact.inquiry_other")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t("contact.message")}{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder={t("contact.message_placeholder")}
                    />
                  </div>

                  {/* Response Note */}
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        {t("contact.note_label")}
                      </strong>{" "}
                      {t("contact.note_text")}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : t("contact.submit_btn")}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
            {t("contact.visit_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t("contact.hq")}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("contact.hq_desc")}
              </p>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">
                    {t("contact.address_label")}
                  </p>
                  <p>
                    Jl. Tebet Barat Dalam II No.5
                    <br />
                    South Jakarta, Indonesia
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {t("contact.hours_label")}
                  </p>
                  <p>
                    {t("contact.hours_week")}
                    <br />
                    {t("contact.hours_weekend")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg h-72 flex items-center justify-center border border-border overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Jl.%20Tebet%20Barat%20Dalam%20II%20No.5%2C%20South%20Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
