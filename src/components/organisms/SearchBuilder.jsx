import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBuilder = ({ isOpen, onClose, onSearch, onPreview }) => {
  const [criteria, setCriteria] = useState([]);
  const [availableFilters] = useState({
    genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Adventure", "Fantasy", "Crime", "Documentary", "Animation"],
    years: ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
    ratings: [
      { label: "9+ Excellent", value: 9 },
      { label: "8+ Great", value: 8 },
      { label: "7+ Good", value: 7 },
      { label: "6+ Fair", value: 6 }
    ],
    platforms: ["Netflix", "Prime Video", "Disney+", "HBO Max", "Hulu", "Apple TV+", "Paramount+", "Peacock"]
  });
  const [previewQuery, setPreviewQuery] = useState("");

  useEffect(() => {
    if (criteria.length > 0) {
      const query = buildNaturalLanguageQuery(criteria);
      setPreviewQuery(query);
      onPreview?.(query);
    } else {
      setPreviewQuery("");
      onPreview?.("");
    }
  }, [criteria, onPreview]);

  const buildNaturalLanguageQuery = (criteriaList) => {
    const parts = [];
    
    const genreCriteria = criteriaList.filter(c => c.type === 'genre');
    const yearCriteria = criteriaList.filter(c => c.type === 'year');
    const ratingCriteria = criteriaList.filter(c => c.type === 'rating');
    const platformCriteria = criteriaList.filter(c => c.type === 'platform');

    if (genreCriteria.length > 0) {
      const genres = genreCriteria.map(c => c.value).join(" or ");
      parts.push(`${genres} movies and shows`);
    }

    if (yearCriteria.length > 0) {
      const years = yearCriteria.map(c => c.value).join(" or ");
      parts.push(`from ${years}`);
    }

    if (ratingCriteria.length > 0) {
      const ratings = ratingCriteria.map(c => c.label).join(" or ");
      parts.push(`rated ${ratings}`);
    }

    if (platformCriteria.length > 0) {
      const platforms = platformCriteria.map(c => c.value).join(" or ");
      parts.push(`on ${platforms}`);
    }

    return parts.length > 0 ? parts.join(" ") : "all content";
  };

  const addCriteria = (type, value, label) => {
    const newCriteria = {
      id: Date.now(),
      type,
      value,
      label: label || value
    };
    setCriteria(prev => [...prev, newCriteria]);
  };

  const removeCriteria = (id) => {
    setCriteria(prev => prev.filter(c => c.id !== id));
  };

  const clearAllCriteria = () => {
    setCriteria([]);
  };

  const handleSearch = () => {
    if (criteria.length > 0) {
      const query = buildNaturalLanguageQuery(criteria);
      onSearch(query, criteria);
    }
  };

  const renderFilterSection = (title, items, type, icon) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ApperIcon name={icon} size={16} className="text-primary" />
        <h4 className="font-medium text-white">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const value = typeof item === 'object' ? item.value : item;
          const label = typeof item === 'object' ? item.label : item;
          const isSelected = criteria.some(c => c.type === type && c.value === value);
          
          return (
            <Button
              key={value}
              variant={isSelected ? "primary" : "ghost"}
              size="sm"
              onClick={() => isSelected ? 
                removeCriteria(criteria.find(c => c.type === type && c.value === value)?.id) :
                addCriteria(type, value, label)
              }
              className={cn(
                "transition-all duration-200",
                isSelected ? "bg-primary text-white" : "hover:bg-surface/70"
              )}
            >
              {label}
              {isSelected && (
                <ApperIcon name="X" size={14} className="ml-1" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-surface border border-gray-700 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <ApperIcon name="Settings" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white">Advanced Search Builder</h2>
              <p className="text-sm text-gray-400">Build complex queries with multiple criteria</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)]">
          {/* Filters Panel */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="grid gap-6">
              {renderFilterSection("Genres", availableFilters.genres, "genre", "Film")}
              {renderFilterSection("Release Year", availableFilters.years, "year", "Calendar")}
              {renderFilterSection("Rating", availableFilters.ratings, "rating", "Star")}
              {renderFilterSection("Platforms", availableFilters.platforms, "platform", "Tv")}
            </div>
          </div>

          {/* Query Builder Panel */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-700 p-6 bg-background/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Active Criteria</h3>
                {criteria.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllCriteria}>
                    <ApperIcon name="Trash2" size={14} />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Active Criteria */}
              <div className="space-y-2 min-h-[100px]">
                <AnimatePresence>
                  {criteria.map((criterion) => (
                    <motion.div
                      key={criterion.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-2 bg-surface border border-gray-600"
                      >
                        <span className="text-xs text-gray-400 uppercase">{criterion.type}</span>
                        <span className="text-white">{criterion.label}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCriteria(criterion.id)}
                          className="p-0 h-auto hover:bg-transparent"
                        >
                          <ApperIcon name="X" size={12} className="text-gray-400 hover:text-white" />
                        </Button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {criteria.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <ApperIcon name="Plus" size={24} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select criteria to build your query</p>
                  </div>
                )}
              </div>

              {/* Query Preview */}
              {previewQuery && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Query Preview</label>
                  <Card className="p-3 bg-surface/50 border-primary/20">
                    <p className="text-sm text-gray-300 italic">"{previewQuery}"</p>
                  </Card>
                </div>
              )}

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                disabled={criteria.length === 0}
                className="w-full"
                variant="primary"
              >
                <ApperIcon name="Search" size={16} className="mr-2" />
                Search ({criteria.length} criteria)
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchBuilder;