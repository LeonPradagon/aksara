"use client";

import { useState } from "react";
import { MessageSquare, Plus, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  name: string;
  organization: string;
  comment: string;
  date: string;
}

const initialComments: Comment[] = [
  {
    name: "Dr. Andi Wijaya",
    organization: "University of Indonesia",
    comment:
      "ACRC's research on defence policy provides invaluable insights for academic discourse. Their methodological rigor and practical recommendations bridge the gap between theory and policy implementation.",
    date: "Jan 25, 2025",
  },
  {
    name: "Sari Purnama",
    organization: "Ministry of Trade",
    comment:
      "The economic analysis provided by ACRC has been instrumental in our policy formulation process. Their data-driven approach offers clarity on complex regulatory challenges.",
    date: "Jan 22, 2025",
  },
  {
    name: "Bambang Hartono",
    organization: "PT Nusantara Energy",
    comment:
      "Working with ACRC on ESG strategy has transformed our approach to sustainability. Their understanding of Indonesia's regulatory landscape is unmatched.",
    date: "Jan 18, 2025",
  },
  {
    name: "Prof. Dewi Kartika",
    organization: "LIPI",
    comment:
      "ACRC consistently produces high-quality research that contributes meaningfully to Indonesia's policy debates. Their independence and analytical depth are commendable.",
    date: "Jan 15, 2025",
  },
  {
    name: "Rizki Pratama",
    organization: "Jakarta Post",
    comment:
      "As a journalist covering policy issues, ACRC's insights and analysis are always reliable sources. Their experts provide balanced and well-researched perspectives.",
    date: "Jan 12, 2025",
  },
  {
    name: "Maya Indira",
    organization: "World Bank Indonesia",
    comment:
      "ACRC's governance research has been valuable for our development programs. Their practical recommendations align well with on-the-ground realities.",
    date: "Jan 10, 2025",
  },
];

export function TestimonialsSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState({
    name: "",
    organization: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) return;

    const commentToAdd: Comment = {
      ...newComment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setComments([commentToAdd, ...comments]);
    setNewComment({ name: "", organization: "", comment: "" });
    setIsOpen(false);
  };

  return (
    <section className="py-16 md:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="font-serif text-5xl font-bold text-foreground mb-4">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Feedback and comments from our readers and stakeholders.
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Comment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a Comment</DialogTitle>
                <DialogDescription>
                  Share your thoughts about ACRC. Your comment will be visible
                  to everyone.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newComment.name}
                    onChange={(e) =>
                      setNewComment({ ...newComment, name: e.target.value })
                    }
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={newComment.organization}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        organization: e.target.value,
                      })
                    }
                    placeholder="Company or Institution"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    value={newComment.comment}
                    onChange={(e) =>
                      setNewComment({ ...newComment, comment: e.target.value })
                    }
                    placeholder="Write your comment here..."
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="gap-2">
                    <Send className="w-4 h-4" />
                    Post Comment
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comments.map((comment, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif font-bold text-primary">
                    {comment.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <h4
                    className="font-semibold text-foreground truncate"
                    title={comment.name}
                  >
                    {comment.name}
                  </h4>
                  <p
                    className="text-sm text-muted-foreground truncate"
                    title={comment.organization || ""}
                  >
                    {comment.organization}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm flex-grow">
                "{comment.comment}"
              </p>
              <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                {comment.date}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> Comments and testimonials displayed on
            this page represent the personal views of the individuals and do not
            necessarily reflect the official position of ACRC.
          </p>
        </div>
      </div>
    </section>
  );
}
