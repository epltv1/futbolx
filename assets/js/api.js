// assets/js/api.js
class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async get(endpoint) {
    try {
      const response = await fetch('/stream.json'); // Changed from /streams.json to /stream.json
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch streams');
    }
  }
}
