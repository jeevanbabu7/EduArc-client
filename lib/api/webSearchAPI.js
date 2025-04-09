import getEnvVars from '../../config.js';

const { IP_ADDRESS } = getEnvVars();

/**
 * Fetches web search results based on a query
 * @param {string} query - The search term
 * @returns {Promise<Array>} - Array of web result objects
 */
export const fetchWebResults = async (query) => {
  try {
    const response = await fetch(`${IP_ADDRESS}:3000/api/resources/web?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch web results');
    }
    
    return data.results || [];
  } catch (error) {
    console.error('Web search API error:', error);
    // Return mock data as fallback
    return [
      {
        title: query + " - Wikipedia",
        link: "https://en.wikipedia.org/wiki/" + query.replace(/\s+/g, '_'),
        snippet: "This article is about " + query + ". " + query + " refers to a concept, idea, or topic that has been extensively documented...",
        source: "Wikipedia"
      },
      {
        title: "Understanding " + query + " | Educational Resource",
        link: "https://example.com/resource",
        snippet: "Learn about " + query + " with our comprehensive educational resources, examples, and practice materials.",
        source: "Educational Platform"
      }
    ];
  }
};
