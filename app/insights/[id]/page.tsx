'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PublicComments } from '@/components/public-comments'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'

interface ArticleDetailPageProps {
  params: {
    id: string
  }
}

// Mock article data - in a real app, this would come from a database
const articleData: Record<string, any> = {
  '1': {
    title: 'Indonesia\'s 2025 Defence Spending: Strategic Priorities and Fiscal Constraints',
    author: 'Dr. Budi Santoso',
    date: 'January 24, 2025',
    category: 'Defence & Security',
    type: 'Report',
    readTime: '8 min read',
    content: `
      <p>Indonesia's defence spending remains a critical indicator of strategic priorities and fiscal capacity. This year's budget allocation reflects evolving security concerns across maritime borders, cyber infrastructure, and regional geopolitical dynamics.</p>

      <h2>Budget Overview</h2>
      <p>The 2025 defence budget allocation stands at approximately 2.3% of government expenditure, representing a modest increase from the previous year. This reflects the government's commitment to modernizing the military while balancing competing fiscal demands.</p>

      <h2>Strategic Priorities</h2>
      <p>Key allocations focus on:</p>
      <ul>
        <li><strong>Maritime Security:</strong> Enhanced naval capabilities and coast guard modernization remain central to Indonesia's strategic posture given its extensive archipelagic territory.</li>
        <li><strong>Cyber Defence:</strong> Growing investment in cybersecurity reflects recognition of emerging threats in the digital domain.</li>
        <li><strong>Personnel Development:</strong> Continued focus on training and professional development of military personnel.</li>
        <li><strong>Infrastructure:</strong> Maintenance and modernization of military facilities across the archipelago.</li>
      </ul>

      <h2>Fiscal Constraints and Trade-offs</h2>
      <p>While defence spending has increased, fiscal constraints limit the pace of military modernization. The government must balance security investments with pressing social spending needs including health, education, and infrastructure.</p>

      <h2>Regional Implications</h2>
      <p>Indonesia's defence trajectory has implications for regional security dynamics. As a regional power and key stakeholder in maritime security, Indonesia's military modernization signals commitment to regional stability while managing strategic competition.</p>

      <h2>Key Recommendations</h2>
      <p>ACRC recommends:</p>
      <ol>
        <li>Enhance defence spending transparency through regular public reporting</li>
        <li>Prioritize high-impact capability development aligned with strategic doctrine</li>
        <li>Strengthen civilian-military coordination on strategic planning</li>
        <li>Increase international defence partnerships to optimize resource efficiency</li>
      </ol>

      <p>Indonesia's defence strategy must continue evolving to address emerging security challenges while maintaining fiscal sustainability.</p>
    `,
    excerpt: 'Analysis of Indonesia\'s defence budget allocation, strategic priorities, and implications for regional security frameworks.',
  },
  '2': {
    title: 'Digital Economy Regulation: Balancing Innovation and Consumer Protection',
    author: 'Dr. Siti Nurhaliza',
    date: 'January 20, 2025',
    category: 'Economy & Business',
    type: 'Article',
    readTime: '6 min read',
    content: `
      <p>Indonesia's digital economy has experienced explosive growth over the past decade, creating unprecedented opportunities and regulatory challenges. Effective governance requires balancing innovation incentives with consumer protection frameworks.</p>

      <h2>Market Context</h2>
      <p>The digital economy now represents approximately 10% of Indonesia's GDP, with e-commerce, fintech, and digital services driving growth. However, rapid expansion has outpaced regulatory development in key areas.</p>

      <h2>Key Regulatory Challenges</h2>
      <p>Policymakers face several interconnected challenges including data privacy protection, consumer dispute resolution, fair competition practices, and tax compliance frameworks for digital businesses.</p>

      <h2>Comparative Approaches</h2>
      <p>Leading digital economies have adopted varied regulatory approaches. This analysis examines models from Singapore, South Korea, and the EU to identify best practices applicable to Indonesia's context.</p>

      <h2>Recommendations</h2>
      <p>ACRC recommends a phased regulatory approach that facilitates innovation while establishing baseline consumer protections and fair competition standards.</p>
    `,
    excerpt: 'Examining the regulatory framework for Indonesia\'s digital economy sector and its impact on startup ecosystem growth.',
  },
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = articleData[params.id as keyof typeof articleData]

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, the article you're looking for doesn't exist.</p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Article Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16 border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              {article.type}
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none text-foreground">
            <article
              className="space-y-6"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-8 mb-4">')
                  .replace(/<p>/g, '<p class="text-base leading-relaxed">')
                  .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 ml-4">')
                  .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 ml-4">')
                  .replace(/<li>/g, '<li class="text-base">')
              }}
            />
          </div>
        </div>
      </section>

      {/* Public Comments Section */}
      <PublicComments articleTitle={article.title} />

      {/* Related Articles */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-10">Related Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(articleData)
              .filter(([id]) => id !== params.id)
              .slice(0, 3)
              .map(([id, data]) => (
                <Link key={id} href={`/insights/${id}`}>
                  <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                        {data.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{data.date}</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {data.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {data.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
