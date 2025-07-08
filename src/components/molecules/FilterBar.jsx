import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const genres = [
    "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", 
    "Thriller", "Adventure", "Animation", "Documentary", "Crime", "Fantasy"
  ];

  const platforms = [
    "Netflix", "Prime Video", "Disney+", "Hulu", "HBO Max", 
    "Apple TV+", "Paramount+", "Peacock"
  ];

  const years = [
    "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"
  ];

  const ratings = [
    { label: "9+ Excellent", value: 9 },
    { label: "8+ Great", value: 8 },
    { label: "7+ Good", value: 7 },
    { label: "6+ Decent", value: 6 }
  ];

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters };
    
    if (category === "rating") {
      newFilters.rating = newFilters.rating === value ? null : value;
    } else {
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
    }
    
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(activeFilters).forEach(filter => {
      if (Array.isArray(filter)) {
        count += filter.length;
      } else if (filter) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <Badge variant="primary" className="text-xs">
              {getActiveFilterCount()} active
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-400 hover:text-white"
            >
              <ApperIcon name="X" size={16} className="mr-1" />
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ApperIcon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          {/* Genres */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Genres</h4>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => handleFilterChange("genres", genre)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    activeFilters.genres?.includes(genre)
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Streaming Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => handleFilterChange("platforms", platform)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    activeFilters.platforms?.includes(platform)
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Years */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Release Year</h4>
            <div className="flex flex-wrap gap-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => handleFilterChange("years", year)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    activeFilters.years?.includes(year)
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Minimum Rating</h4>
            <div className="flex flex-wrap gap-2">
              {ratings.map(rating => (
                <button
                  key={rating.value}
                  onClick={() => handleFilterChange("rating", rating.value)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    activeFilters.rating === rating.value
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {rating.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterBar;