import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import SearchBuilder from "@/components/organisms/SearchBuilder";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchHeader = ({ onSearch, searchQuery, onAdvancedSearch }) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [previewQuery, setPreviewQuery] = useState("");

  const handleAdvancedSearch = (query, criteria) => {
    setShowAdvancedSearch(false);
    onAdvancedSearch?.(query, criteria);
  };

  const handlePreview = (query) => {
    setPreviewQuery(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      {/* Logo and Title */}
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="bg-gradient-primary p-3 rounded-full">
            <ApperIcon name="Brain" size={32} className="text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold gradient-text">
            WatchNext AI
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Discover your perfect movie or TV show with intelligent natural language search
        </motion.p>
      </div>

{/* Search Bar */}
      <div className="max-w-3xl mx-auto space-y-4">
        <SearchBar onSearch={onSearch} />
        
        {/* Advanced Search Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedSearch(true)}
            className="text-gray-400 hover:text-white border border-gray-700 hover:border-primary/50"
          >
            <ApperIcon name="Settings" size={16} className="mr-2" />
            Advanced Search Builder
          </Button>
        </div>
      </div>
      {/* Quick Search Examples */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <p className="text-sm text-gray-400 mb-4">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Comedy movies with The Rock",
              "Shows like Stranger Things",
              "Best sci-fi movies of 2023",
              "Binge-worthy crime series"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => onSearch(example)}
                className="px-4 py-2 bg-surface/50 hover:bg-surface border border-gray-700 rounded-full text-sm text-gray-300 hover:text-white transition-colors"
              >
                "{example}"
              </button>
            ))}
          </div>
        </motion.div>
)}

      {/* Advanced Search Modal */}
      <AnimatePresence>
        <SearchBuilder
          isOpen={showAdvancedSearch}
          onClose={() => setShowAdvancedSearch(false)}
          onSearch={handleAdvancedSearch}
          onPreview={handlePreview}
        />
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchHeader;