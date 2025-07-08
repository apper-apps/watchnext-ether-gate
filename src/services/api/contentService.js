import contentData from "@/services/mockData/content.json";

export const ContentService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...contentData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const content = contentData.find(item => item.Id === parseInt(id));
    if (!content) {
      throw new Error("Content not found");
    }
    return { ...content };
  },

  async getTrending() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return contentData
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10)
      .map(item => ({ ...item }));
  },

  async getByGenre(genre) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return contentData
      .filter(item => item.genres.includes(genre))
      .map(item => ({ ...item }));
  },

  async getByType(type) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return contentData
      .filter(item => item.type === type)
      .map(item => ({ ...item }));
  },

  async getByYear(year) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return contentData
      .filter(item => item.year === parseInt(year))
      .map(item => ({ ...item }));
  },

  async getByRating(minRating) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return contentData
      .filter(item => item.rating >= minRating)
      .sort((a, b) => b.rating - a.rating)
      .map(item => ({ ...item }));
  },

  async getByPlatform(platform) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return contentData
      .filter(item => item.platforms.some(p => p.name === platform))
      .map(item => ({ ...item }));
  },

  async create(content) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...contentData.map(item => item.Id), 0);
    const newContent = {
      ...content,
      Id: maxId + 1
    };
    contentData.push(newContent);
    return { ...newContent };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = contentData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Content not found");
    }
    contentData[index] = { ...contentData[index], ...updates };
    return { ...contentData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = contentData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Content not found");
    }
    const deleted = contentData.splice(index, 1)[0];
    return { ...deleted };
  }
};