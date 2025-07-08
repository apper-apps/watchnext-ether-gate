import { ContentService } from "./contentService";

export const SearchService = {
  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allContent = await ContentService.getAll();
    const lowerQuery = query.toLowerCase();
    
    // Smart search logic
    let results = [];
    
    // Check for actor/actress searches
    if (lowerQuery.includes("dwayne johnson") || lowerQuery.includes("the rock")) {
      results = allContent.filter(item => 
        item.cast.some(actor => 
          actor.name.toLowerCase().includes("dwayne johnson") ||
          actor.character.toLowerCase().includes("rock")
        )
      );
    }
    
    // Check for "like" searches (similarity)
    else if (lowerQuery.includes("like ")) {
      const showName = lowerQuery.split("like ")[1];
      if (showName.includes("big bang") || showName.includes("office")) {
        results = allContent.filter(item => 
          item.genres.includes("Comedy") && item.type === "series"
        );
      } else if (showName.includes("stranger things")) {
        results = allContent.filter(item => 
          item.genres.includes("Sci-Fi") && item.genres.includes("Horror")
        );
      } else if (showName.includes("breaking bad")) {
        results = allContent.filter(item => 
          item.genres.includes("Crime") && item.genres.includes("Drama")
        );
      }
    }
    
    // Check for popularity searches
    else if (lowerQuery.includes("popular") || lowerQuery.includes("trending") || lowerQuery.includes("best")) {
      results = allContent
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10);
    }
    
    // Check for genre searches
    else if (lowerQuery.includes("comedy")) {
      results = allContent.filter(item => item.genres.includes("Comedy"));
    }
    else if (lowerQuery.includes("action")) {
      results = allContent.filter(item => item.genres.includes("Action"));
    }
    else if (lowerQuery.includes("horror")) {
      results = allContent.filter(item => item.genres.includes("Horror"));
    }
    else if (lowerQuery.includes("sci-fi") || lowerQuery.includes("science fiction")) {
      results = allContent.filter(item => item.genres.includes("Sci-Fi"));
    }
    else if (lowerQuery.includes("drama")) {
      results = allContent.filter(item => item.genres.includes("Drama"));
    }
    
    // Check for year searches
    else if (lowerQuery.includes("2023") || lowerQuery.includes("2024")) {
      const year = lowerQuery.includes("2023") ? 2023 : 2024;
      results = allContent.filter(item => item.year === year);
    }
    
    // Check for type searches
    else if (lowerQuery.includes("movies") || lowerQuery.includes("movie")) {
      results = allContent.filter(item => item.type === "movie");
    }
    else if (lowerQuery.includes("series") || lowerQuery.includes("shows") || lowerQuery.includes("tv")) {
      results = allContent.filter(item => item.type === "series");
    }
    
    // General title search
    else {
      results = allContent.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.synopsis.toLowerCase().includes(lowerQuery) ||
        item.genres.some(genre => genre.toLowerCase().includes(lowerQuery)) ||
        item.cast.some(actor => 
          actor.name.toLowerCase().includes(lowerQuery) ||
          actor.character.toLowerCase().includes(lowerQuery)
        )
      );
    }
    
return results;
  },

  async searchAdvanced(query, criteria) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allContent = await ContentService.getAll();
    let results = [...allContent];
    
    // Apply criteria-based filtering
    criteria.forEach(criterion => {
      switch (criterion.type) {
        case 'genre':
          results = results.filter(item => 
            item.genres.includes(criterion.value)
          );
          break;
        case 'year':
          results = results.filter(item => 
            item.year.toString() === criterion.value.toString()
          );
          break;
        case 'rating':
          results = results.filter(item => 
            item.rating >= parseFloat(criterion.value)
          );
          break;
        case 'platform':
          results = results.filter(item => 
            item.platforms.includes(criterion.value)
          );
          break;
      }
    });
    
    // Sort by popularity if no specific sorting criteria
    results = results.sort((a, b) => b.popularity - a.popularity);
    
    return results;
  },

  async getSearchSuggestions(query) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
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