// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const ContentService = {
  async getAll() {
    try {
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
        orderBy: [
          {
            fieldName: "popularity",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
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
      console.error("Error fetching all content:", error);
      throw new Error("Failed to fetch content");
    }
  },

  async getById(id) {
    try {
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
        ]
      };
      
      const response = await apperClient.getRecordById("content", parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching content with ID ${id}:`, error);
      throw new Error("Content not found");
    }
  },

  async getTrending() {
    try {
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
        orderBy: [
          {
            fieldName: "popularity",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 10,
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
      console.error("Error fetching trending content:", error);
      throw new Error("Failed to fetch trending content");
    }
  },

  async getByGenre(genre) {
    try {
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
        where: [
          {
            FieldName: "genres",
            Operator: "Contains",
            Values: [genre]
          }
        ],
        orderBy: [
          {
            fieldName: "popularity",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching content by genre ${genre}:`, error);
      throw new Error("Failed to fetch content by genre");
    }
  },

  async getByType(type) {
    try {
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
        where: [
          {
            FieldName: "type",
            Operator: "EqualTo",
            Values: [type]
          }
        ],
        orderBy: [
          {
            fieldName: "popularity",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching content by type ${type}:`, error);
      throw new Error("Failed to fetch content by type");
    }
  },

  async getByYear(year) {
    try {
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
        where: [
          {
            FieldName: "year",
            Operator: "EqualTo",
            Values: [parseInt(year)]
          }
        ],
        orderBy: [
          {
            fieldName: "popularity",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching content by year ${year}:`, error);
      throw new Error("Failed to fetch content by year");
    }
  },

  async getByRating(minRating) {
    try {
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
        where: [
          {
            FieldName: "rating",
            Operator: "GreaterThanOrEqualTo",
            Values: [minRating]
          }
        ],
        orderBy: [
          {
            fieldName: "rating",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching content by rating ${minRating}:`, error);
      throw new Error("Failed to fetch content by rating");
    }
  },

  async getByPlatform(platform) {
    // Note: Platform data is stored as JSON in database, this is a simplified search
    try {
      const allContent = await this.getAll();
      return allContent.filter(item => 
        item.platforms && item.platforms.some(p => p.name === platform)
      );
    } catch (error) {
      console.error(`Error fetching content by platform ${platform}:`, error);
      throw new Error("Failed to fetch content by platform");
    }
  },

  async create(content) {
    try {
      // Only include Updateable fields
      const contentData = {
        cast: content.cast || "",
        popularity: content.popularity || 0,
        Name: content.Name || content.title || "",
        Tags: content.Tags || "",
        title: content.title || "",
        type: content.type || "movie",
        year: content.year || new Date().getFullYear(),
        genres: content.genres || "",
        rating: content.rating || 0,
        posterUrl: content.posterUrl || "",
        synopsis: content.synopsis || ""
      };

      const params = {
        records: [contentData]
      };
      
      const response = await apperClient.createRecord("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create content");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating content:", error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      // Only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      };
      
      // Add only updateable fields that are provided
      if (updates.cast !== undefined) updateData.cast = updates.cast;
      if (updates.popularity !== undefined) updateData.popularity = updates.popularity;
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.Tags !== undefined) updateData.Tags = updates.Tags;
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.type !== undefined) updateData.type = updates.type;
      if (updates.year !== undefined) updateData.year = updates.year;
      if (updates.genres !== undefined) updateData.genres = updates.genres;
      if (updates.rating !== undefined) updateData.rating = updates.rating;
      if (updates.posterUrl !== undefined) updateData.posterUrl = updates.posterUrl;
      if (updates.synopsis !== undefined) updateData.synopsis = updates.synopsis;

      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error("Failed to update content");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error(`Error updating content with ID ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("content", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error("Failed to delete content");
        }
        
        return true;
      }
    } catch (error) {
      console.error(`Error deleting content with ID ${id}:`, error);
      throw error;
    }
  }
};