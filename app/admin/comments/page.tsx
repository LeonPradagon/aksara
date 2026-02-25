"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  MessageSquare,
  Trash2,
  User,
  Calendar,
  ExternalLink,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Swal from "sweetalert2";

interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  content: string;
  created_at: string;
  article_title?: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      // Backend might need a dedicated admin endpoint for ALL comments,
      // or we fetch per article. For now, assuming /api/comments returns all or we handle it.
      const response = await api.get("/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Comment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#01172C",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/comments/${id}`);
        setComments(comments.filter((c) => c.id !== id));
        Swal.fire("Deleted", "Comment removed.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete comment", "error");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Comments Moderation
        </h1>
        <p className="text-sm text-slate-500">
          Monitor and manage user engagement on articles.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-slate-500 font-medium">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-10" />
            <p className="text-lg font-medium">No comments yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-6 hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {comment.author_name}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium">
                        <span className="text-slate-400 italic">
                          On Article:{" "}
                          {comment.article_title || "Unknown Article"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
