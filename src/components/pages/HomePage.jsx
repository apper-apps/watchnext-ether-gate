import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SearchHeader from "@/components/organisms/SearchHeader";
import FilterBar from "@/components/molecules/FilterBar";
import ContentGrid from "@/components/organisms/ContentGrid";
import ContentDetail from "@/components/organisms/ContentDetail";
import TrendingSidebar from "@/components/organisms/TrendingSidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { ContentService } from "@/services/api/contentService";
import { SearchService } from "@/services/api/searchService";
import { AuthContext } from "../../App";
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

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setFilters({});
    setLastSearchCriteria(null);
    toast.info("Search and filters cleared");
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

const { user, isAuthenticated } = useSelector((state) => state.user);
  const authMethods = useContext(AuthContext);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Will be handled by App.jsx authentication flow
      return;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-4">Please log in to access WatchNext AI</div>
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
        <div className="flex gap-8">
<div className="min-h-screen bg-gradient-dark">
      {/* Logout Button */}
      <div className="flex justify-end p-4">
        <Button
          variant="outline"
          onClick={authMethods.logout}
          className="text-gray-400 hover:text-white border-gray-600 hover:border-gray-500"
        >
          <ApperIcon name="LogOut" size={16} className="mr-2" />
          Logout
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
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
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
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
                  
                  <Button
                    variant="outline"
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-white border-gray-600 hover:border-gray-500"
                  >
                    <ApperIcon name="X" size={16} className="mr-2" />
                    Clear Search
                  </Button>
                </div>

                <FilterBar 
                  onFiltersChange={handleFiltersChange}
                  activeFilters={filters}
                  onClearSearch={clearSearch}
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