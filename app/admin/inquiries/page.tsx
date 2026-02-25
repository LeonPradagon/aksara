"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Mail,
  User,
  Calendar,
  Tag,
  Loader2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Building2,
  Phone,
  MessageCircle,
} from "lucide-react";
import Swal from "sweetalert2";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  phone: string;
  inquiry_type: string;
  message: string;
  created_at: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact");
      setInquiries(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Inquiry?",
      text: "This log will be removed forever.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#01172C",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/contact/${id}`);
        setInquiries(inquiries.filter((i) => i.id !== id));
        Swal.fire("Deleted", "Inquiry removed.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete inquiry", "error");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Stakeholder Inquiries
          </h1>
          <p className="text-sm text-slate-500">
            Total of {inquiries.length} messages received via the contact form.
          </p>
        </div>
        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-slate-500 font-medium">Loading inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-40 text-center text-slate-500">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 opacity-20" />
            </div>
            <p className="text-lg font-bold">Inbox Empty</p>
            <p className="text-sm opacity-60">
              New inquiries from the website will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`transition-all ${expandedId === inquiry.id ? "bg-slate-50/50 dark:bg-slate-800/20" : "hover:bg-slate-50"}`}
              >
                <div className="p-6 md:p-8 flex items-start justify-between gap-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      setExpandedId(
                        expandedId === inquiry.id ? null : inquiry.id,
                      )
                    }
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white uppercase">
                          {inquiry.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {inquiry.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold hidden sm:inline">
                        —
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {inquiry.email}
                      </span>
                      <span className="ml-auto text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-400 flex items-center gap-1 font-bold">
                        <Calendar className="w-3 h-3" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        {inquiry.inquiry_type || "GENERAL"}
                      </div>
                      {inquiry.organization && (
                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                          <Building2 className="w-3 h-3" />
                          {inquiry.organization}
                        </div>
                      )}
                      {inquiry.phone && (
                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3 h-3" />
                          {inquiry.phone}
                        </div>
                      )}
                    </div>

                    {expandedId !== inquiry.id && (
                      <p className="mt-4 text-sm text-slate-500 truncate max-w-3xl border-l-2 border-slate-200 pl-4 italic">
                        "{inquiry.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === inquiry.id ? null : inquiry.id,
                        )
                      }
                      className={`p-3 rounded-xl transition-all ${expandedId === inquiry.id ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:bg-slate-100"}`}
                    >
                      {expandedId === inquiry.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {expandedId === inquiry.id && (
                  <div className="px-8 pb-10">
                    <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Incoming Message
                        </h4>
                        <MessageCircle className="w-4 h-4 text-slate-200" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-sm font-medium">
                        {inquiry.message}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                            Company / Organization
                          </p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">
                            {inquiry.organization || "Private Individual"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                            Phone Number
                          </p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {inquiry.phone || "Not provided"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-end gap-4">
                        <a
                          href={`mailto:${inquiry.email}?subject=Re: Aksara Cakra Research Inquiry (${inquiry.inquiry_type})`}
                          className="px-6 py-3 bg-[#01172C] text-white text-xs font-bold rounded-xl hover:bg-primary transition-all shadow-xl shadow-primary/10 flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Reply via Professional Mail
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
