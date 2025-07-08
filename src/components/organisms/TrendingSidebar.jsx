import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { ContentService } from "@/services/api/contentService";

const TrendingSidebar = ({ onContentSelect }) => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      setLoading(true);
      const data = await ContentService.getTrending();
      setTrending(data.slice(0, 5));
    } catch (error) {
      console.error("Failed to load trending content:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <Card className="p-4 w-80 h-fit">
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded shimmer" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-16 h-20 bg-gray-700 rounded shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded shimmer" />
                <div className="h-3 bg-gray-700 rounded shimmer w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 space-y-6"
    >
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon name="TrendingUp" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-white">Trending Now</h3>
        </div>
        
        <div className="space-y-3">
          {trending.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 p-3 hover:bg-surface/50 rounded-lg cursor-pointer transition-colors"
              onClick={() => onContentSelect(item)}
            >
              <img
                src={item.posterUrl}
                alt={item.title}
                className="w-12 h-16 object-cover rounded"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm truncate">
                  {item.title}
                </h4>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{item.year}</span>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Star" size={12} className={getRatingColor(item.rating)} />
                    <span className={`text-xs ${getRatingColor(item.rating)}`}>
                      {item.rating}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-2">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {item.type}
                  </Badge>
                  <Badge variant="primary" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-white">Search Tips</h3>
        </div>
        
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-2">
            <ApperIcon name="Search" size={16} className="text-primary mt-0.5" />
            <span>Try "Shows like Breaking Bad" for similar content</span>
          </div>
          
          <div className="flex items-start gap-2">
            <ApperIcon name="User" size={16} className="text-primary mt-0.5" />
            <span>Search by actor: "Tom Hanks movies"</span>
          </div>
          
          <div className="flex items-start gap-2">
            <ApperIcon name="Calendar" size={16} className="text-primary mt-0.5" />
            <span>Find by year: "Best movies of 2023"</span>
          </div>
          
          <div className="flex items-start gap-2">
            <ApperIcon name="Tag" size={16} className="text-primary mt-0.5" />
            <span>Filter by genre: "Horror movies"</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TrendingSidebar;