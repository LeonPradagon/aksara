"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  User,
  Calendar,
  Tag,
  Loader2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle,
  FileText,
  Download,
  Mail,
  Briefcase,
} from "lucide-react";
import Swal from "sweetalert2";

interface CareerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  cv_path: string;
  created_at: string;
}

export default function AdminCareersPage() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/careers");
      setApplications(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Application?",
      text: "This application will be removed forever.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#01172C",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/careers/${id}`);
        setApplications(applications.filter((a) => a.id !== id));
        Swal.fire("Deleted", "Application removed.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete application", "error");
      }
    }
  };

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  const BASE_URL = API_URL.replace("/api", ""); // Gets just the host origin for the CV path

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Career Applications
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Total of {applications.length} applications received.
          </p>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-slate-500 font-medium">
              Loading applications...
            </p>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-20 md:py-40 text-center text-slate-500 p-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 md:w-10 md:h-10 opacity-20" />
            </div>
            <p className="text-base md:text-lg font-bold">
              No Applications Yet
            </p>
            <p className="text-xs md:text-sm opacity-60">
              New career and internship applications will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((application) => (
              <div
                key={application.id}
                className={`transition-all ${expandedId === application.id ? "bg-slate-50/50 dark:bg-slate-800/20" : "hover:bg-slate-50"}`}
              >
                <div className="p-4 md:p-8 flex items-start justify-between gap-4">
                  <div
                    className="flex-1 cursor-pointer min-w-0"
                    onClick={() =>
                      setExpandedId(
                        expandedId === application.id ? null : application.id,
                      )
                    }
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold text-white uppercase">
                          {application.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base truncate max-w-[100px] sm:max-w-none">
                          {application.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold hidden md:inline">
                        —
                      </span>
                      <span className="text-[10px] md:text-xs text-slate-500 font-medium truncate max-w-[150px] sm:max-w-xs">
                        {application.email}
                      </span>
                      <span className="ml-0 sm:ml-auto text-[9px] md:text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 md:py-1 rounded-md text-slate-400 flex items-center gap-1 font-bold">
                        <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {new Date(application.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <div className="px-2 py-0.5 md:px-2.5 md:py-1 bg-primary/10 text-primary text-[8px] md:text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-primary/20">
                        <Briefcase className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {application.role}
                      </div>
                      {application.phone && (
                        <div className="px-2 py-0.5 md:px-2.5 md:py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[8px] md:text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          <span className="truncate">{application.phone}</span>
                        </div>
                      )}
                    </div>

                    {expandedId !== application.id && application.message && (
                      <p className="mt-4 text-[10px] md:text-sm text-slate-500 truncate max-w-full border-l-2 border-slate-200 pl-3 md:pl-4 italic">
                        "{application.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === application.id ? null : application.id,
                        )
                      }
                      className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all ${expandedId === application.id ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:bg-slate-100"}`}
                    >
                      {expandedId === application.id ? (
                        <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(application.id)}
                      className="p-2 md:p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg md:rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>

                {expandedId === application.id && (
                  <div className="px-4 md:px-8 pb-6 md:pb-10">
                    <div className="p-5 md:p-8 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Cover Letter / Message
                        </h4>
                        <MessageCircle className="w-4 h-4 text-slate-200" />
                      </div>

                      {application.message ? (
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-xs md:text-sm font-medium">
                          {application.message}
                        </p>
                      ) : (
                        <p className="text-slate-400 italic text-xs md:text-sm">
                          No cover letter provided.
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                            Uploaded Document
                          </p>
                          <a
                            href={`${BASE_URL}${application.cv_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-primary text-xs md:text-sm font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download CV / Resume
                          </a>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                            Phone Number
                          </p>
                          <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                            {application.phone || "Not provided"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 md:mt-10 flex justify-end gap-4">
                        <a
                          href={`mailto:${application.email}?subject=Re: Application for ${application.role} at ACRC`}
                          className="w-full sm:w-auto px-6 py-3 bg-[#01172C] text-white text-[10px] md:text-xs font-bold rounded-xl hover:bg-primary transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Contact Applicant
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
