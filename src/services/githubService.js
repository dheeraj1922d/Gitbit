import localforage from 'localforage';

const CACHE_PREFIX = 'gitbit_cache_';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.rateLimitRemaining = 60;
    this.rateLimitReset = null;
  }

  async fetchWithCache(url, options = {}) {
    const cacheKey = `${CACHE_PREFIX}${url}`;
    
    // Try to get from cache first
    try {
      const cached = await localforage.getItem(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('Returning cached data for:', url);
        return cached.data;
      }
    } catch (error) {
      console.warn('Cache read error:', error);
    }

    // Check rate limit
    if (this.rateLimitRemaining <= 0 && this.rateLimitReset && Date.now() < this.rateLimitReset) {
      const waitTime = Math.ceil((this.rateLimitReset - Date.now()) / 1000);
      throw new Error(`Rate limit exceeded. Reset in ${waitTime} seconds.`);
    }

    // Fetch from API
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers,
      },
    });

    // Update rate limit info
    this.rateLimitRemaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '60');
    const resetTime = response.headers.get('X-RateLimit-Reset');
    if (resetTime) {
      this.rateLimitReset = parseInt(resetTime) * 1000;
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the result
    try {
      await localforage.setItem(cacheKey, {
        data,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn('Cache write error:', error);
    }

    return data;
  }

  async getRepoContents(owner, repo, path = '') {
    const url = `${this.baseURL}/repos/${owner}/${repo}/contents/${path}`;
    return this.fetchWithCache(url);
  }

  async getFileContent(owner, repo, path) {
    const url = `${this.baseURL}/repos/${owner}/${repo}/contents/${path}`;
    const data = await this.fetchWithCache(url);
    
    if (data.content) {
      // Decode base64 content
      return atob(data.content.replace(/\n/g, ''));
    }
    
    return null;
  }

  async getRepoTree(owner, repo, branch = 'main') {
    const url = `${this.baseURL}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    return this.fetchWithCache(url);
  }

  async getRepoInfo(owner, repo) {
    const url = `${this.baseURL}/repos/${owner}/${repo}`;
    return this.fetchWithCache(url);
  }

  async clearCache() {
    const keys = await localforage.keys();
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
    await Promise.all(cacheKeys.map(key => localforage.removeItem(key)));
    console.log(`Cleared ${cacheKeys.length} cached items`);
  }

  getRateLimitInfo() {
    return {
      remaining: this.rateLimitRemaining,
      reset: this.rateLimitReset ? new Date(this.rateLimitReset) : null,
    };
  }
}

export default new GitHubService();
