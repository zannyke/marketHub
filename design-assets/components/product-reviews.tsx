"use client"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    verified: true,
    title: "Best headphones I've ever owned!",
    content:
      "The sound quality is exceptional and the noise cancellation really works. Battery lasts forever and they're so comfortable for long sessions.",
    helpful: 45,
    avatar: "SJ",
  },
  {
    id: 2,
    author: "Michael Chen",
    rating: 4,
    date: "1 week ago",
    verified: true,
    title: "Great value for money",
    content:
      "Very good headphones at this price point. The only minor issue is they can be a bit heavy after extended wear, but overall excellent.",
    helpful: 28,
    avatar: "MC",
  },
  {
    id: 3,
    author: "Emma Davis",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Exceeded my expectations",
    content:
      "Customer service was amazing and the product quality is top-notch. Shipping was fast and packaging was perfect. Highly recommend!",
    helpful: 62,
    avatar: "ED",
  },
]

export function ProductReviews() {
  const [showMoreReviews, setShowMoreReviews] = useState(false)

  return (
    <div className="py-12 border-b border-border">
      <h2 className="text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>

      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 p-8 bg-card rounded-xl border border-border">
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">4.8</div>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < 4 ? "text-secondary" : "text-muted"}>
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on 324 reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="md:col-span-2 space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground w-12">{rating} star</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${rating >= 4 ? "bg-secondary" : rating >= 3 ? "bg-accent" : "bg-destructive"}`}
                  style={{
                    width: `${rating >= 4 ? 85 : rating === 3 ? 10 : 5}%`,
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {rating >= 4 ? "276" : rating === 3 ? "32" : "16"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <Button className="mb-8 bg-primary hover:bg-primary/90 text-primary-foreground">Write a Review</Button>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 bg-card border border-border rounded-xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {review.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{review.author}</h4>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-secondary text-secondary" />
                      ))}
                    </div>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Content */}
            <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{review.content}</p>

            {/* Helpful Button */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-muted">
                <ThumbsUp size={16} className="mr-1" />
                Helpful ({review.helpful})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Reviews */}
      {!showMoreReviews && (
        <Button
          variant="outline"
          className="w-full mt-8 border-border bg-transparent hover:bg-muted"
          onClick={() => setShowMoreReviews(true)}
        >
          Load More Reviews
        </Button>
      )}
    </div>
  )
}
