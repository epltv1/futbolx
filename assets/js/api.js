// assets/js/api.js
class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async get(endpoint) {
    try {
      const response = await fetch('/streams.json');
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch streams');
    }
  }
}
