"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  FileIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";

export default function ArticleFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    type: "ACRC Commentaries",
    excerpt: "",
    content: "",
    published: false,
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetchArticle();
    }
  }, [isEdit]);

  const fetchArticle = async () => {
    try {
      const response = await api.get(`/articles/${params.id}`);
      const article = response.data;
      setFormData({
        title: article.title,
        author: article.author || "",
        category: article.category || "",
        type: article.type || "ACRC Commentaries",
        excerpt: article.excerpt || "",
        content: article.content || "",
        published: article.published || false,
      });
      setCurrentPdfUrl(article.pdf_url || null);
    } catch (error) {
      Swal.fire("Error", "Could not fetch article details", "error");
      router.push("/admin/articles");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        Swal.fire("Invalid File", "Please upload only PDF files", "warning");
        return;
      }
      setPdfFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("category", formData.category);
    data.append("type", formData.type);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);
    data.append("published", String(formData.published));
    if (pdfFile) {
      data.append("pdf", pdfFile);
    }

    try {
      if (isEdit) {
        await api.put(`/articles/${params.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire(
          "Updated!",
          "Article has been successfully updated.",
          "success",
        );
      } else {
        await api.post("/articles", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Created!", "New article has been published.", "success");
      }
      router.push("/admin/articles");
    } catch (error: any) {
      console.error("Submit Error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to save article",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-slate-500 font-medium">Loading article data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Nav */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-primary transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {isEdit ? "Edit Article" : "Create New Publication"}
          </h1>
          <p className="text-sm text-slate-500">
            {isEdit
              ? `Modifying ${formData.title}`
              : "Add a new research finding to the insights section"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Article Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                  placeholder="The Nusantara Policy: A Strategic Update"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Abstract / Summary (Excerpt)
                </label>
                <textarea
                  name="excerpt"
                  required
                  rows={4}
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Provide a brief summary of the research..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Full Content (Optional)
                </label>
                <textarea
                  name="content"
                  rows={10}
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Detailed article content if not only using PDF..."
                />
              </div>
            </div>
          </div>

          {/* Sidebar / Options */}
          <div className="space-y-6">
            {/* PDF Upload */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                PDF Attachment
              </h3>

              <div className="space-y-3">
                {pdfFile ? (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileIcon className="w-8 h-8 text-primary flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-primary truncate">
                          {pdfFile.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPdfFile(null)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ) : currentPdfUrl ? (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileIcon className="w-8 h-8 text-slate-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300 italic">
                        Current PDF exists
                      </span>
                    </div>
                    <label className="cursor-pointer text-xs font-bold text-primary hover:underline">
                      Change
                      <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl py-8 px-4 cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition-all group">
                    <Upload className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors mb-2" />
                    <span className="text-xs font-bold text-slate-500">
                      Upload PDF Publication
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
                <p className="text-[10px] text-slate-400 text-center">
                  Only PDF files are allowed. Max 10MB recommended.
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                  placeholder="Researcher Name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Defence & Security">Defence & Security</option>
                  <option value="Politics & Governance">
                    Politics & Governance
                  </option>
                  <option value="Economy & Business">Economy & Business</option>
                  <option value="Elections & Democracy">
                    Elections & Democracy
                  </option>
                  <option value="ESG & Sustainability">
                    ESG & Sustainability
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Publication Type
                </label>
                <select
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                >
                  <option value="ACRC's Concern">ACRC's Concern</option>
                  <option value="ACRC Commentaries">ACRC Commentaries</option>
                  <option value="ACRC's Working Paper">
                    ACRC's Working Paper
                  </option>
                  <option value="Events & Presentations">
                    Events & Presentations
                  </option>
                  <option value="ACRC's Bulletin">ACRC's Bulletin</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Published Status
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          published: e.target.checked,
                        }))
                      }
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  When published, this article will be visible on the public
                  website and home page.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isEdit ? "Update Publication" : "Publish Article"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
