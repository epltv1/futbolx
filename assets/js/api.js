// assets/js/api.js
class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async get() {
    try {
      const response = await fetch('/api/streams');
      console.log('Fetch response status:', response.status, response.url);
      if (!response.ok) throw new Error(`Network error: ${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch streams');
    }
  }
}
