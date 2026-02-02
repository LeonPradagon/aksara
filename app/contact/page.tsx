'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to a backend
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', organization: '', inquiryType: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">Contact ACRC</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            We welcome the opportunity to discuss your research or consulting needs. Reach out to start an initial conversation through the contact form, or get in touch directly via email or phone.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Office Address</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Aksara Cakra Research and Consulting (ACRC)<br />
                        Jl. Tebet Barat II No.5<br />
                        South Jakarta<br />
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground text-sm italic">To be added</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm italic">To be added</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/services" className="text-primary hover:text-primary/80 transition-colors">Our Services</Link></li>
                  <li><Link href="/insights" className="text-primary hover:text-primary/80 transition-colors">Insights & Analysis</Link></li>
                  <li><Link href="/team" className="text-primary hover:text-primary/80 transition-colors">Meet Our Team</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                        Organisation / Company <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="organization"
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your organisation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number <span className="text-muted-foreground text-xs">(optional)</span>
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
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
                      Type of Inquiry <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="government">Government</option>
                      <option value="soes">SOEs / Regional SOEs (BUMN/BUMD)</option>
                      <option value="private">Private Companies</option>
                      <option value="political">Political Parties / Candidates</option>
                      <option value="international">International Organisations</option>
                      <option value="other">Other Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Please describe your inquiry. For urgent matters, kindly indicate this in your message."
                    />
                  </div>

                  {/* Response Note */}
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Note:</strong> ACRC aims to respond within 2-3 working days. If your matter is urgent, please indicate this clearly in your message. Providing a phone number is important for timely follow-up.
                    </p>
                  </div>

                  {submitted && (
                    <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
                      Thank you for contacting ACRC. We have received your message and will respond within 2-3 working days.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded hover:opacity-90 transition-opacity"
                  >
                    Submit Inquiry
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
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">Visit Our Office</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">ACRC Headquarters</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our office is located in South Jakarta. We welcome visitors by appointment for in-person meetings and discussions.
              </p>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <p>Jl. Tebet Barat II No.5<br />South Jakarta, Indonesia</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Office Hours</p>
                  <p>Monday – Friday: 9:00 AM – 5:00 PM WIB<br />Saturday – Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg h-72 flex items-center justify-center border border-border">
              <p className="text-muted-foreground text-center px-4">Map placeholder<br />Jl. Tebet Barat II No.5, South Jakarta</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
