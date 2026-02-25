"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  FileText,
  MessageSquare,
  Mail,
  ArrowRight,
  TrendingUp,
  Loader2,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface Stats {
  articles: number;
  comments: number;
  inquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get("/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Stats Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-slate-500 font-medium">
          Crunching dashboard data...
        </p>
      </div>
    );
  }

  const cards = [
    {
      title: "Research Articles",
      value: stats?.articles || 0,
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      href: "/admin/articles",
      color: "bg-blue-50",
      description: "Published research papers & insights",
    },
    {
      title: "Active Comments",
      value: stats?.comments || 0,
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      href: "/admin/comments",
      color: "bg-purple-50",
      description: "User discussions & feedback",
    },
    {
      title: "Contact Inquiries",
      value: stats?.inquiries || 0,
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      href: "/admin/inquiries",
      color: "bg-orange-50",
      description: "Stakeholder questions & leads",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-[#01172C] to-[#022a4d] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Welcome back, Admin</h1>
          <p className="text-white/70 max-w-xl">
            You have total control over the Aksara Cakra Research ecosystem.
            Monitor engagement, moderate discussions, and publish new findings
            from one central hub.
          </p>
        </div>
        <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white/5 rotate-12" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <Link key={idx} href={card.href} className="group">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all h-full bg-card">
              <div
                className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
                {card.title}
              </h3>
              <p className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                {card.value}
              </p>
              <p className="text-xs text-slate-400 mb-6">{card.description}</p>
              <div className="flex items-center text-primary text-xs font-bold gap-2 group-hover:gap-3 transition-all">
                MANAGE MODULE <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Mock (Optional/Future) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            System Overview
          </h2>
        </div>
        <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-400 font-medium">
            System is running optimally.
          </p>
          <p className="text-xs text-slate-400 mt-2 italic">
            Detailed activity logs will appear here as the platform scales.
          </p>
        </div>
      </div>
    </div>
  );
}
