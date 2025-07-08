import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ onSearch, placeholder = "Ask me anything about movies and TV shows..." }) => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleVoiceSearch = () => {
    // Voice search functionality would be implemented here
    console.log("Voice search clicked");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "pr-24 text-lg h-14 bg-surface/80 backdrop-blur-sm border-2 transition-all duration-300",
              isTyping ? "border-primary shadow-lg shadow-primary/20" : "border-gray-700"
            )}
          />
          
          {/* AI Sparkle Animation */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2"
            >
              <ApperIcon 
                name="Sparkles" 
                size={20} 
                className="text-primary animate-pulse" 
              />
            </motion.div>
          )}

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleVoiceSearch}
              className="p-2 hover:bg-primary/20"
            >
              <ApperIcon name="Mic" size={18} />
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="px-4"
              disabled={!query.trim()}
            >
              <ApperIcon name="Search" size={18} />
            </Button>
          </div>
        </div>
      </form>

      {/* Search Suggestions */}
      {query.length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-surface/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
        >
          <div className="p-4">
            <p className="text-sm text-gray-400 mb-2">Try searching for:</p>
            <div className="space-y-2">
              <button
                onClick={() => setQuery("Comedy movies with The Rock")}
                className="w-full text-left px-3 py-2 hover:bg-primary/10 rounded-md text-sm text-gray-300 hover:text-white transition-colors"
              >
                Comedy movies with The Rock
              </button>
              <button
                onClick={() => setQuery("Shows like Big Bang Theory")}
                className="w-full text-left px-3 py-2 hover:bg-primary/10 rounded-md text-sm text-gray-300 hover:text-white transition-colors"
              >
                Shows like Big Bang Theory
              </button>
              <button
                onClick={() => setQuery("Most popular movies of 2024")}
                className="w-full text-left px-3 py-2 hover:bg-primary/10 rounded-md text-sm text-gray-300 hover:text-white transition-colors"
              >
                Most popular movies of 2024
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;