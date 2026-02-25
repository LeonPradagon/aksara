"use client";

import React, { useState, useEffect } from "react";
import { User, MessageSquare, Mail, Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/api";
import Swal from "sweetalert2";
import Link from "next/link";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface PublicCommentsProps {
  articleId: string;
  articleTitle: string;
}

export function PublicComments({
  articleId,
  articleTitle,
}: PublicCommentsProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [guestName, setGuestName] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/comments/article/${articleId}`);
      setComments(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    const finalAuthorName = user ? user.name : guestName;

    if (!finalAuthorName.trim()) {
      Swal.fire("Error", "Please provide a name to post a comment.", "error");
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.post("/comments", {
        content,
        article_id: articleId,
        author_name: finalAuthorName,
      });

      const newComment: Comment = {
        id: response.data.id,
        author_name: finalAuthorName,
        content: content,
        created_at: new Date().toISOString(),
      };

      setComments([...comments, newComment]);
      setContent("");
      if (!user) setGuestName("");

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Comment posted!",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to post comment",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 border-t border-border bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Research Discussion
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Collaborative insights on{" "}
            <span className="text-primary font-bold italic">
              "{articleTitle}"
            </span>
          </p>
        </header>

        {/* Comment Form */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-border shadow-sm mb-16">
          <form onSubmit={handleSubmit}>
            {!user && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Your Signature Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Dr. Jane Smith"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl border border-border bg-white dark:bg-slate-800 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    required={!user}
                  />
                </div>
              </div>
            )}

            {user && (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                    Posting as {user.role}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Analyze or comment on this research..."
                rows={5}
                className="w-full px-6 py-4 rounded-2xl border border-border bg-white dark:bg-slate-800 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MessageSquare className="w-4 h-4" />
              )}
              Post Contribution
            </button>
          </form>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-16">
          <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
            <strong>Moderation Policy:</strong> Comments represent personal
            views and not ACRC's official position. We reserve the right to
            moderate contributions to ensure respectful and professional
            research discussion.
          </p>
        </div>

        {/* Comments List */}
        <div className="space-y-10">
          <div className="flex items-center gap-3 mb-10">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Contributions
            </h3>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full text-xs font-bold">
              {comments.length}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
              <p className="text-slate-500 italic">Retriving discussions...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-900/10 rounded-[2rem] border border-dashed border-border px-8">
              <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">
                No discussions yet. Be the first to analyze this research!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="relative pl-8 border-l-2 border-primary/20 pb-4 group"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-primary/30 group-hover:border-primary transition-colors"></div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary text-xs font-bold">
                        {c.author_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">
                          {c.author_name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {new Date(c.created_at).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-primary/20 transition-all">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
