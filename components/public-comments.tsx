'use client'

import React from "react"

import { useState } from 'react'
import { User, MessageSquare, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Comment {
  id: string
  name: string
  email?: string
  comment: string
  timestamp: string
}

interface PublicCommentsProps {
  articleTitle: string
}

const dummyComments: Comment[] = [
  {
    id: '1',
    name: 'Dr. Bambang Sutrisno',
    email: 'bambang@example.com',
    comment: 'Insightful analysis on the current policy direction. This perspective is crucial for stakeholders in the energy sector.',
    timestamp: '2 days ago',
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    email: '',
    comment: 'The data presented here challenges some conventional wisdom. Would be interested in seeing the methodology section expanded.',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    name: 'Prof. Achmad Suryanto',
    email: 'asuryanto@univ.id',
    comment: 'Excellent work. This report should be required reading for anyone involved in policy formulation in this sector.',
    timestamp: '6 hours ago',
  },
]

export function PublicComments({ articleTitle }: PublicCommentsProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [comments, setComments] = useState<Comment[]>(dummyComments)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !comment.trim()) {
      return
    }

    const newComment: Comment = {
      id: String(comments.length + 1),
      name,
      email: email || undefined,
      comment,
      timestamp: 'Just now',
    }

    setComments([newComment, ...comments])
    setName('')
    setEmail('')
    setComment('')
    setSubmitted(true)

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-2">Public Comments</h2>
        <p className="text-muted-foreground mb-8">
          Share your thoughts on "{articleTitle}"
        </p>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-2">
              Comment <span className="text-destructive">*</span>
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
              Thank you for your comment! It will be reviewed before posting.
            </div>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Post Comment
          </button>
        </form>

        {/* Disclaimer */}
        <div className="bg-muted/50 border border-border rounded-lg p-6 mb-12">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Disclaimer:</strong> The comments posted here represent the personal views of the commenters and do not necessarily reflect the official position, opinions, or policies of Aksara Cakra Research and Consulting (ACRC). ACRC does not endorse or assume responsibility for any comments made by third parties. Comments are moderated and may be edited or removed if they violate community standards.
          </p>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          <h3 className="font-bold text-lg text-foreground">
            Comments ({comments.length})
          </h3>

          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted mx-auto mb-4" />
              <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="border-l-4 border-primary/30 pl-6 py-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{c.name}</p>
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {c.email}
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.timestamp}</span>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{c.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
