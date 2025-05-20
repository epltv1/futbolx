class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
