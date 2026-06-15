"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { Save, Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Text Settings State
  const [settings, setSettings] = useState({
  });

  // Current uploaded URLs
  const [currentImages, setCurrentImages] = useState({
    home_hero_image_1: "",
    home_hero_image_2: "",
    about_who_we_are_image: "",
  });

  // Pending files to upload
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    home_hero_image_1: null,
    home_hero_image_2: null,
    about_who_we_are_image: null,
  });

  const [activeTab, setActiveTab] = useState("home_about");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      const data = res.data;
      
      setSettings({
      });

      setCurrentImages({
        home_hero_image_1: data.home_hero_image_1 || "",
        home_hero_image_2: data.home_hero_image_2 || "",
        about_who_we_are_image: data.about_who_we_are_image || "",
      });
    } catch (error) {
      console.error("Failed to fetch settings", error);
      Swal.fire("Error", "Could not load settings.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        Swal.fire("Invalid File", "Please upload only image files", "warning");
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
    }
  };

  const removeFile = (key: string) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
  };

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("/picture/") || url.startsWith("/tim/")) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}${url}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    
    // Append JSON text settings
    // In FormData, we can append settings as a JSON string, or map them individually
    // Backend expects { settings: { ... } } if we parse JSON, 
    // BUT since we are using FormData (multer), we can just append "settings" as stringified JSON or field by field.
    // Let's modify the backend to parse stringified settings, or we can just append them.
    // For simplicity, we stringify the object:
    formData.append("settings", JSON.stringify(settings));

    if (files.home_hero_image_1) formData.append("home_hero_image_1", files.home_hero_image_1);
    if (files.home_hero_image_2) formData.append("home_hero_image_2", files.home_hero_image_2);
    if (files.about_who_we_are_image) formData.append("about_who_we_are_image", files.about_who_we_are_image);

    try {
      await api.put("/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Saved!", "Site settings updated successfully.", "success");
      fetchSettings(); // Refresh to get new image URLs
      setFiles({ home_hero_image_1: null, home_hero_image_2: null, about_who_we_are_image: null });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to save settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Site Settings</h1>
        <p className="text-slate-500">Manage dynamic content and configurations for your public website.</p>
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("home_about")}
          className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === "home_about" ? "text-primary" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"}`}
        >
          Images (Home & About)
          {activeTab === "home_about" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        
        {/* HOME & ABOUT IMAGES */}
        {activeTab === "home_about" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-lg font-bold mb-4">Home Page (Hero Carousel)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader 
                  label="Slide 1 Image" 
                  currentUrl={currentImages.home_hero_image_1 || "/picture/home.jpeg"}
                  file={files.home_hero_image_1}
                  onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange("home_hero_image_1", e)}
                  onRemove={() => removeFile("home_hero_image_1")}
                  getImageUrl={getImageUrl}
                />
                <ImageUploader 
                  label="Slide 2 Image" 
                  currentUrl={currentImages.home_hero_image_2 || "/picture/home-2.jpeg"}
                  file={files.home_hero_image_2}
                  onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange("home_hero_image_2", e)}
                  onRemove={() => removeFile("home_hero_image_2")}
                  getImageUrl={getImageUrl}
                />
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            <div>
              <h2 className="text-lg font-bold mb-4">About Page (Who We Are)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader 
                  label="Who We Are Background" 
                  currentUrl={currentImages.about_who_we_are_image || "/picture/ilustrasi-keadilan.jpg"}
                  file={files.about_who_we_are_image}
                  onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange("about_who_we_are_image", e)}
                  onRemove={() => removeFile("about_who_we_are_image")}
                  getImageUrl={getImageUrl}
                />
              </div>
            </div>
          </div>
        )}



        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

function ImageUploader({ label, currentUrl, file, onFileChange, onRemove, getImageUrl }: any) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
      <label className="block text-sm font-bold mb-3">{label}</label>
      
      {file ? (
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
          <ImageIcon className="w-8 h-8 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">{file.name}</p>
            <p className="text-[10px] text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button type="button" onClick={onRemove} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
            {currentUrl ? (
              <Image src={getImageUrl(currentUrl)} alt={label} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-slate-300" />
              </div>
            )}
          </div>
          <label className="flex items-center justify-center w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:border-primary transition-colors text-sm font-medium">
            <Upload className="w-4 h-4 mr-2" /> Change Image
            <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
          </label>
        </div>
      )}
    </div>
  );
}
