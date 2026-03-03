"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  FileText,
  Calendar,
  MoreVertical,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  created_at: string;
  pdf_url?: string;
  published: boolean;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get("/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#01172C",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/articles/${id}`);
        setArticles(articles.filter((a) => a.id !== id));
        Swal.fire("Deleted!", "Article has been removed.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete article", "error");
      }
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Articles Management
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Total: {articles.length} research publications
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm"
        >
          <Plus className="w-5 h-5" />
          Create New Article
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:text-primary transition-colors w-full sm:w-auto text-sm">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
            <p className="font-medium">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-10" />
            <p className="text-lg font-medium">No articles found</p>
            <p className="text-sm">
              Get started by creating your first publication.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="px-4 md:px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Article Title
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Author
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Date Created
                  </th>
                  <th className="px-4 md:px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                  >
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <div className="min-w-0 max-w-[150px] sm:max-w-xs md:max-w-sm">
                          <p className="font-bold text-slate-900 dark:text-white truncate text-sm md:text-base">
                            {article.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="sm:hidden px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] font-bold rounded uppercase">
                              {article.category}
                            </span>
                            <span className="md:hidden text-[10px] text-slate-400 font-medium">
                              By {article.author}
                            </span>
                            {article.pdf_url && (
                              <a
                                href={`http://localhost:5342${article.pdf_url}`}
                                target="_blank"
                                className="text-[10px] text-primary hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                PDF
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium hidden md:table-cell">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium hidden lg:table-cell">
                      {article.published ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full border border-green-200">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full border border-slate-200">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        <Link
                          href={`/admin/articles/edit/${article.id}`}
                          className="p-1.5 md:p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-1.5 md:p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
