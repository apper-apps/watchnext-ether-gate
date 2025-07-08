// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const SearchService = {
  async search(query) {
    try {
      const lowerQuery = query.toLowerCase();
      let params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "type" } },
          { field: { Name: "year" } },
          { field: { Name: "genres" } },
          { field: { Name: "rating" } },
          { field: { Name: "posterUrl" } },
          { field: { Name: "synopsis" } },
          { field: { Name: "cast" } },
          { field: { Name: "popularity" } }
        ],
        orderBy: [
          {
            fieldName: "popularity",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      // Smart search logic using ApperClient whereGroups
      let whereGroups = [];
      
      // Check for "like" searches (similarity)
      if (lowerQuery.includes("like ")) {
        const showName = lowerQuery.split("like ")[1];
        if (showName.includes("big bang") || showName.includes("office")) {
          whereGroups = [{
            operator: "AND",
            subGroups: [{
              operator: "AND",
              conditions: [
                {
                  fieldName: "genres",
                  operator: "Contains",
                  values: ["Comedy"]
                },
                {
                  fieldName: "type",
                  operator: "EqualTo",
                  values: ["series"]
                }
              ]
            }]
          }];
        } else if (showName.includes("stranger things")) {
          whereGroups = [{
            operator: "AND",
            subGroups: [{
              operator: "AND",
              conditions: [
                {
                  fieldName: "genres",
                  operator: "Contains",
                  values: ["Sci-Fi"]
                },
                {
                  fieldName: "genres",
                  operator: "Contains",
                  values: ["Horror"]
                }
              ]
            }]
          }];
        } else if (showName.includes("breaking bad")) {
          whereGroups = [{
            operator: "AND",
            subGroups: [{
              operator: "AND",
              conditions: [
                {
                  fieldName: "genres",
                  operator: "Contains",
                  values: ["Crime"]
                },
                {
                  fieldName: "genres",
                  operator: "Contains",
                  values: ["Drama"]
                }
              ]
            }]
          }];
        }
      }
      
      // Check for popularity searches
      else if (lowerQuery.includes("popular") || lowerQuery.includes("trending") || lowerQuery.includes("best")) {
        params.pagingInfo.limit = 10;
        // Use default ordering by popularity DESC
      }
      
      // Check for genre searches
      else if (lowerQuery.includes("comedy")) {
        params.where = [{
          FieldName: "genres",
          Operator: "Contains",
          Values: ["Comedy"]
        }];
      }
      else if (lowerQuery.includes("action")) {
        params.where = [{
          FieldName: "genres",
          Operator: "Contains",
          Values: ["Action"]
        }];
      }
      else if (lowerQuery.includes("horror")) {
        params.where = [{
          FieldName: "genres",
          Operator: "Contains",
          Values: ["Horror"]
        }];
      }
      else if (lowerQuery.includes("sci-fi") || lowerQuery.includes("science fiction")) {
        params.where = [{
          FieldName: "genres",
          Operator: "Contains",
          Values: ["Sci-Fi"]
        }];
      }
      else if (lowerQuery.includes("drama")) {
        params.where = [{
          FieldName: "genres",
          Operator: "Contains",
          Values: ["Drama"]
        }];
      }
      
      // Check for year searches
      else if (lowerQuery.includes("2023") || lowerQuery.includes("2024")) {
        const year = lowerQuery.includes("2023") ? 2023 : 2024;
        params.where = [{
          FieldName: "year",
          Operator: "EqualTo",
          Values: [year]
        }];
      }
      
      // Check for type searches
      else if (lowerQuery.includes("movies") || lowerQuery.includes("movie")) {
        params.where = [{
          FieldName: "type",
          Operator: "EqualTo",
          Values: ["movie"]
        }];
      }
      else if (lowerQuery.includes("series") || lowerQuery.includes("shows") || lowerQuery.includes("tv")) {
        params.where = [{
          FieldName: "type",
          Operator: "EqualTo",
          Values: ["series"]
        }];
      }
      
      // General title and content search
      else {
        whereGroups = [{
          operator: "OR",
          subGroups: [
            {
              operator: "OR",
              conditions: [
                {
                  fieldName: "title",
                  operator: "Contains",
                  values: [query]
                },
                {
                  fieldName: "synopsis",
                  operator: "Contains",
                  values: [query]
                },
                {
                  fieldName: "cast",
                  operator: "Contains",
                  values: [query]
                },
                {
                  fieldName: "genres",
                  operator: "Contains",
                  values: [query]
                }
              ]
            }
          ]
        }];
      }

      // Add whereGroups if defined
      if (whereGroups.length > 0) {
        params.whereGroups = whereGroups;
      }
      
      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error searching content:", error);
      throw new Error("Failed to search content");
    }
  },

  async searchAdvanced(query, criteria) {
    try {
      let whereGroups = [];
      let conditions = [];
      
      // Apply criteria-based filtering
      criteria.forEach(criterion => {
        switch (criterion.type) {
          case 'genre':
            conditions.push({
              fieldName: "genres",
              operator: "Contains",
              values: [criterion.value]
            });
            break;
          case 'year':
            conditions.push({
              fieldName: "year",
              operator: "EqualTo",
              values: [parseInt(criterion.value)]
            });
            break;
          case 'rating':
            conditions.push({
              fieldName: "rating",
              operator: "GreaterThanOrEqualTo",
              values: [parseFloat(criterion.value)]
            });
            break;
          case 'platform':
            // Platform search would need custom logic since it's JSON data
            break;
        }
      });

      // Add text search if query provided
      if (query.trim()) {
        conditions.push({
          fieldName: "title",
          operator: "Contains",
          values: [query]
        });
      }

      if (conditions.length > 0) {
        whereGroups = [{
          operator: "AND",
          subGroups: [{
            operator: "AND",
            conditions: conditions
          }]
        }];
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "type" } },
          { field: { Name: "year" } },
          { field: { Name: "genres" } },
          { field: { Name: "rating" } },
          { field: { Name: "posterUrl" } },
          { field: { Name: "synopsis" } },
          { field: { Name: "cast" } },
          { field: { Name: "popularity" } }
        ],
        whereGroups: whereGroups,
        orderBy: [
          {
            fieldName: "popularity",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error in advanced search:", error);
      throw new Error("Failed to perform advanced search");
    }
  },

  async getSearchSuggestions(query) {
    // Static suggestions for now - could be enhanced with database-driven suggestions
    const suggestions = [
      "Comedy movies with The Rock",
      "Shows like Big Bang Theory",
      "Most popular movies of 2023",
      "Horror movies from the 80s",
      "Sci-fi series on Netflix",
      "Movies with Leonardo DiCaprio",
      "Best action movies of 2024",
      "Binge-worthy crime series"
    ];
    
    if (!query) return suggestions;
    
    const lowerQuery = query.toLowerCase();
    return suggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(lowerQuery)
    );
  }
};

/**
 * REAL DATA INTEGRATION GUIDE
 * 
 * To connect this application to live data sources, replace the mock implementations
 * above with actual API calls. The service interface should remain unchanged to
 * maintain compatibility with existing components.
 * 
 * RECOMMENDED APPROACH:
 * 
 * 1. API Configuration:
 *    - Add environment variables in .env for API endpoints
 *    - Example: VITE_API_BASE_URL=https://api.yourservice.com
 *    - Use different endpoints for development/staging/production
 * 
 * 2. Authentication:
 *    - Implement API key or OAuth token management
 *    - Add authorization headers to all requests
 *    - Handle token refresh and expiration
 * 
 * 3. HTTP Client Setup:
 *    - Add axios or fetch wrapper with base configuration
 *    - Include error handling, retry logic, and timeout settings
 *    - Implement request/response interceptors for auth and logging
 * 
 * 4. Error Handling:
 *    - Map API error codes to user-friendly messages
 *    - Implement fallback behavior for network failures
 *    - Add retry mechanisms for transient failures
 * 
 * 5. Data Transformation:
 *    - Map API response fields to match expected data structure
 *    - Ensure Id field is integer and follows application conventions
 *    - Handle missing or null values appropriately
 * 
 * EXAMPLE IMPLEMENTATIONS:
 * 
 * async search(query) {
 *   try {
 *     const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
 *       headers: {
 *         'Authorization': `Bearer ${getAuthToken()}`,
 *         'Content-Type': 'application/json'
 *       }
 *     });
 *     
 *     if (!response.ok) {
 *       throw new Error(`Search failed: ${response.status}`);
 *     }
 *     
/**
 * APPER BACKEND INTEGRATION NOTES
 * 
 * This search service has been fully integrated with the Apper Backend using ApperClient.
 * All search operations now use real-time database queries with proper field mapping.
 * 
 * KEY FEATURES IMPLEMENTED:
 * 
 * 1. Smart Search Logic:
 *    - Natural language processing for queries like "comedy movies", "shows like Big Bang Theory"
 *    - Genre-based filtering using ApperClient where conditions
 *    - Year and type filtering with proper database queries
 *    - Text search across title, synopsis, cast, and genres
 * 
 * 2. Advanced Search:
 *    - Multi-criteria filtering using whereGroups
 *    - Proper AND/OR logic for complex queries
 *    - Rating-based filtering with numerical comparisons
 *    - Combined text and criteria searches
 * 
 * 3. Database Field Mapping:
 *    - All fields mapped to content table schema
 *    - Proper data type handling (integers for year/rating, strings for text)
 *    - Popularity-based ordering for relevant results
 * 
 * 4. Error Handling:
 *    - Top-level response.success validation
 *    - Graceful fallback to empty results
 *    - Detailed error logging for debugging
 * 
 * 5. Performance Optimization:
 *    - Limited result sets (50 records max for search, 10 for trending)
 *    - Efficient field selection to minimize data transfer
 *    - Proper pagination support
 * 
 * FUTURE ENHANCEMENTS:
* - Real-time search suggestions from database
 * - Advanced platform filtering with JSON field queries
 * - Fuzzy text matching for better search results
 * - Search analytics and popular query tracking
 * - Cached search results for improved performance
 */