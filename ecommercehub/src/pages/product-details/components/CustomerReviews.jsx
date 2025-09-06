import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('newest');

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-amber-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  const sortedReviews = [...reviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b?.rating - a?.rating;
      case 'lowest':
        return a?.rating - b?.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 lg:mb-0">
          Customer Reviews
        </h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-foreground">
              {averageRating?.toFixed(1)}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(averageRating)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({totalReviews?.toLocaleString()} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((rating) => {
            const count = ratingDistribution?.[rating];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground w-8">
                  {rating} ★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Individual Reviews */}
      <div className="space-y-6">
        {sortedReviews?.slice(0, 5)?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.avatar}
                alt={review?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-foreground">
                      {review?.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date)?.toLocaleDateString()}
                  </span>
                </div>
                
                {review?.title && (
                  <h4 className="font-medium text-foreground">
                    {review?.title}
                  </h4>
                )}
                
                <p className="text-muted-foreground leading-relaxed">
                  {review?.comment}
                </p>

                {review?.verified && (
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success font-medium">
                      Verified Purchase
                    </span>
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4 pt-2">
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reviews?.length > 5 && (
        <div className="text-center pt-6">
          <button className="text-primary hover:text-primary/80 font-medium transition-colors">
            View All {totalReviews} Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;