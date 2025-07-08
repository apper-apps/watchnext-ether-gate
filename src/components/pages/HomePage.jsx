import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import SearchHeader from "@/components/organisms/SearchHeader";
import FilterBar from "@/components/molecules/FilterBar";
import ContentGrid from "@/components/organisms/ContentGrid";
import ContentDetail from "@/components/organisms/ContentDetail";
import TrendingSidebar from "@/components/organisms/TrendingSidebar";
import { ContentService } from "@/services/api/contentService";
import { SearchService } from "@/services/api/searchService";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);
  const [lastSearchCriteria, setLastSearchCriteria] = useState(null);

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);

      const results = await SearchService.search(query);
      setSearchResults(results);

      // Update search history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));

      toast.success(`Found ${results.length} results for "${query}"`);
    } catch (err) {
      setError(err.message || "Failed to search content");
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
};

  const handleAdvancedSearch = async (query, criteria) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);
      setLastSearchCriteria(criteria);

      const results = await SearchService.searchAdvanced(query, criteria);
      setSearchResults(results);

      // Update search history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));

      toast.success(`Found ${results.length} results with advanced search`);
    } catch (err) {
      setError(err.message || "Failed to search content");
      toast.error("Advanced search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to current results
    applyFilters(newFilters);
  };

  const applyFilters = (appliedFilters) => {
    // This would typically be handled by the backend
    // For now, we'll just show a toast
    const filterCount = Object.values(appliedFilters).filter(f => 
      Array.isArray(f) ? f.length > 0 : f !== null && f !== undefined
    ).length;
    
    if (filterCount > 0) {
      toast.info(`Applied ${filterCount} filter${filterCount > 1 ? 's' : ''}`);
    }
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  const handleContentSelect = (content) => {
    setSelectedContent(content);
    toast.info(`Viewing details for "${content.title}"`);
  };

  const handleCloseDetail = () => {
    setSelectedContent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
<SearchHeader 
              onSearch={handleSearch} 
              onAdvancedSearch={handleAdvancedSearch}
              searchQuery={searchQuery}
            />
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
<div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-display font-bold text-white">
                    Results for "{searchQuery}"
                  </h2>
                  <div className="flex items-center gap-4">
                    {searchResults.length > 0 && (
                      <span className="text-gray-400">
                        {searchResults.length} found
                      </span>
                    )}
                    {lastSearchCriteria && (
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Advanced ({lastSearchCriteria.length} criteria)
                      </span>
                    )}
                  </div>
                </div>

                <FilterBar 
                  onFiltersChange={handleFiltersChange}
                  activeFilters={filters}
                />
              </motion.div>
            )}

            <ContentGrid
              content={searchResults}
              loading={loading}
              error={error}
              onRetry={handleRetry}
              onContentSelect={handleContentSelect}
              searchQuery={searchQuery}
            />
          </div>

          {/* Sidebar - Only show on desktop */}
          <div className="hidden lg:block">
            <TrendingSidebar onContentSelect={handleContentSelect} />
          </div>
        </div>
      </div>

      {/* Content Detail Modal */}
      <AnimatePresence>
        {selectedContent && (
          <ContentDetail
            content={selectedContent}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;