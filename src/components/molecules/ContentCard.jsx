import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ContentCard = ({ content, onSelect, className }) => {
  const getPlatformBadgeVariant = (platform) => {
    const variants = {
      "Netflix": "netflix",
      "Prime Video": "prime",
      "Disney+": "disney",
      "Hulu": "hulu",
      "HBO Max": "hbo",
      "Apple TV+": "apple",
      "Paramount+": "paramount",
      "Peacock": "peacock"
    };
    return variants[platform] || "default";
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn("group cursor-pointer", className)}
      onClick={() => onSelect(content)}
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-surface shadow-lg transition-all duration-300 group-hover:shadow-2xl content-card">
        {/* Poster Image */}
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={content.posterUrl}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick action buttons */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="primary"
              size="sm"
              className="w-full backdrop-blur-sm bg-primary/90"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(content);
              }}
            >
              <ApperIcon name="Play" size={16} className="mr-2" />
              View Details
            </Button>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-white text-lg leading-tight group-hover:text-primary transition-colors">
              {content.title}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <ApperIcon name="Star" size={14} className={getRatingColor(content.rating)} />
              <span className={getRatingColor(content.rating)}>{content.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{content.year}</span>
            <span>•</span>
            <span className="capitalize">{content.type}</span>
          </div>

{/* Genres */}
          <div className="flex flex-wrap gap-1">
            {(() => {
              // Handle both string (from database) and array (from mock data) formats
              const genresArray = Array.isArray(content.genres) 
                ? content.genres 
                : typeof content.genres === 'string' 
                  ? content.genres.split(',').map(g => g.trim()).filter(g => g) 
                  : [];
              
              return genresArray.slice(0, 2).map((genre, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ));
            })()}
            {(() => {
              const genresArray = Array.isArray(content.genres) 
                ? content.genres 
                : typeof content.genres === 'string' 
                  ? content.genres.split(',').map(g => g.trim()).filter(g => g) 
                  : [];
              
              return genresArray.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{genresArray.length - 2}
                </Badge>
              );
            })()}
          </div>

          {/* Streaming Platforms */}
          <div className="flex flex-wrap gap-1">
            {content.platforms.slice(0, 3).map((platform, index) => (
              <Badge
                key={index}
                variant={getPlatformBadgeVariant(platform.name)}
                className="text-xs platform-badge"
              >
                {platform.name}
              </Badge>
            ))}
            {content.platforms.length > 3 && (
              <Badge variant="default" className="text-xs">
                +{content.platforms.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;