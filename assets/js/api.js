// assets/js/api.js
class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async get() { // Removed endpoint parameter since it's hardcoded
    try {
      const response = await fetch('/stream.json');
      console.log('Fetch response status:', response.status, response.url);
      if (!response.ok) throw new Error(`Network error: ${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch streams');
    }
  }
}
