"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLocale } from "@/contexts/locale-context";
import { useSearchParams } from "next/navigation";
import { Loader2, UploadCloud, CheckCircle } from "lucide-react";

function CareerApplyContent() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: roleParam,
    message: "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (roleParam) {
      setFormData((prev) => ({ ...prev, role: roleParam }));
    }
  }, [roleParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      setErrorMessage(
        t("career_apply.form.cv_required") || "CV file is required",
      );
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("role", formData.role);
      submitData.append("message", formData.message);
      submitData.append("cv", cvFile);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const response = await fetch(`${apiUrl}/careers/apply`, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: roleParam,
        message: "",
      });
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 w-full">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          {t("career_apply.title") || "Application Form"}
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          {t("career_apply.subtitle") ||
            "Submit your application and CV to join our team."}
        </p>

        {status === "success" ? (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              {t("career_apply.success_title") ||
                "Application Submitted Successfully"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("career_apply.success_desc") ||
                "Thank you for applying. We have received your application and will review it shortly."}
            </p>
            <a
              href="/careers"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
            >
              {t("career_apply.back_button") || "Back to Careers"}
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t("career_apply.form.name") || "Full Name"} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("career_apply.form.email") || "Email Address"} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  {t("career_apply.form.phone") || "Phone Number"} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  {t("career_apply.form.role") || "Position / Role"} *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  readOnly={!!roleParam}
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 ${roleParam ? "bg-muted border-transparent cursor-not-allowed" : "bg-card border-border"}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                {t("career_apply.form.message") || "Cover Letter / Message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("career_apply.form.cv") || "Upload CV"} *
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${cvFile ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud
                  className={`w-8 h-8 mx-auto mb-3 ${cvFile ? "text-primary" : "text-muted-foreground"}`}
                />
                <p className="text-sm font-medium mb-1">
                  {cvFile
                    ? cvFile.name
                    : t("career_apply.form.cv_prompt") ||
                      "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("career_apply.form.cv_types") || "PDF, DOCX up to 10MB"}
                </p>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            </div>

            {status === "error" && (
              <div className="p-4 bg-red-500/10 text-red-500 rounded-md text-sm border border-red-500/20">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex justify-center items-center py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("career_apply.form.submitting") || "Submitting..."}
                </>
              ) : (
                t("career_apply.form.submit") || "Submit Application"
              )}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CareerApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <CareerApplyContent />
    </Suspense>
  );
}
