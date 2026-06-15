"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ArrowLeft, Save, Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";

interface TeamFormProps {
  memberId?: string; // If provided, it's edit mode
}

export default function TeamForm({ memberId }: TeamFormProps) {
  const router = useRouter();
  const isEdit = !!memberId;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const [formData, setFormData] = useState({
    name: "",
    titleEn: "",
    titleId: "",
    shortBioEn: "",
    shortBioId: "",
    bioEn: "",
    bioId: "",
    type: "ASSOCIATE",
    order: 0,
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetchMember();
    }
  }, [isEdit]);

  const fetchMember = async () => {
    try {
      const response = await api.get(`/team/${memberId}`);
      const member = response.data;
      setFormData({
        name: member.name,
        titleEn: member.title_en || "",
        titleId: member.title_id || "",
        shortBioEn: member.short_bio_en || "",
        shortBioId: member.short_bio_id || "",
        bioEn: member.bio_en || "",
        bioId: member.bio_id || "",
        type: member.type || "ASSOCIATE",
        order: member.order || 0,
      });
      setCurrentPhotoUrl(member.photo_url || null);
    } catch (error) {
      Swal.fire("Error", "Could not fetch team member details", "error");
      router.push("/admin/team");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        Swal.fire("Invalid File", "Please upload only image files", "warning");
        return;
      }
      setPhotoFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith("image/")) {
        Swal.fire("Invalid File", "Please upload only image files", "warning");
        return;
      }
      setPhotoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("titleEn", formData.titleEn);
    data.append("titleId", formData.titleId);
    data.append("shortBioEn", formData.shortBioEn);
    data.append("shortBioId", formData.shortBioId);
    data.append("bioEn", formData.bioEn);
    data.append("bioId", formData.bioId);
    data.append("type", formData.type);
    data.append("order", String(formData.order));
    
    if (photoFile) {
      data.append("photo", photoFile);
    }

    try {
      if (isEdit) {
        await api.put(`/team/${memberId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setUploadProgress(percentCompleted);
          },
        });
        Swal.fire("Updated!", "Team member has been successfully updated.", "success");
      } else {
        await api.post("/team", data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setUploadProgress(percentCompleted);
          },
        });
        Swal.fire("Created!", "New team member has been added.", "success");
      }
      router.push("/admin/team");
    } catch (error: any) {
      console.error("Submit Error:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to save team member", "error");
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(null), 1000);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-slate-500 font-medium">Loading team member data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
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
            {isEdit ? "Edit Team Member" : "Add Team Member"}
          </h1>
          <p className="text-sm text-slate-500">
            {isEdit ? `Modifying ${formData.name}` : "Add a new member to the team roster"}
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                  placeholder="Dr. John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    required
                    value={formData.titleEn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    placeholder="Research Associate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Title (Indonesian)
                  </label>
                  <input
                    type="text"
                    name="titleId"
                    required
                    value={formData.titleId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    placeholder="Peneliti Madya"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Short Bio (English)
                  </label>
                  <textarea
                    name="shortBioEn"
                    rows={3}
                    value={formData.shortBioEn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm"
                    placeholder="Brief summary..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Short Bio (Indonesian)
                  </label>
                  <textarea
                    name="shortBioId"
                    rows={3}
                    value={formData.shortBioId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm"
                    placeholder="Ringkasan singkat..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Full Bio (English)
                </label>
                <textarea
                  name="bioEn"
                  required
                  rows={6}
                  value={formData.bioEn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Full Bio (Indonesian)
                </label>
                <textarea
                  name="bioId"
                  required
                  rows={6}
                  value={formData.bioId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sidebar / Options */}
          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                Profile Photo
              </h3>

              <div className="space-y-3">
                {photoFile ? (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <ImageIcon className="w-8 h-8 text-primary flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-primary truncate">
                          {photoFile.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {(photoFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhotoFile(null)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ) : currentPhotoUrl ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <Image
                        src={
                          currentPhotoUrl.startsWith("http") || currentPhotoUrl.startsWith("/tim/")
                            ? currentPhotoUrl 
                            : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}${currentPhotoUrl}`
                        }
                        alt="Current Profile Photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Current photo
                      </span>
                      <label className="cursor-pointer text-xs font-bold text-primary hover:underline">
                        Change
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-8 px-4 cursor-pointer transition-all group ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <ImageIcon
                      className={`w-8 h-8 transition-colors mb-2 ${isDragging ? "text-primary" : "text-slate-300 group-hover:text-primary"}`}
                    />
                    <span className="text-xs font-bold text-slate-500 text-center">
                      {isDragging
                        ? "Drop image here"
                        : "Drag & Drop or Click to Upload Photo"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
                {uploadProgress !== null && (
                  <div className="space-y-2 mt-4">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-center text-slate-500 font-medium">
                      {uploadProgress}% Uploaded...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                >
                  <option value="CEO">CEO / Leadership</option>
                  <option value="ASSOCIATE">Associate Research</option>
                  <option value="ADVISORY_BOARD">Advisory Board</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  required
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                  placeholder="0"
                />
                <p className="text-[10px] text-slate-400 mt-2">
                  Lower numbers appear first.
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
                {isEdit ? "Update Member" : "Save Member"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
