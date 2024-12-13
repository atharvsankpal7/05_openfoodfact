import axios from 'axios';
import type { Product, SearchResponse } from './types';

const BASE_URL = 'https://world.openfoodfacts.org';

const client = axios.create({
  baseURL: BASE_URL,
});

export const apiClient = {
  async getAllProducts(page = 1): Promise<SearchResponse> {
    const { data } = await client.get('/cgi/search.pl', {
      params: {
        json: true,
        page,
        page_size: 24,
        sort_by: 'popularity_key',
      },
    });
    return data;
  },

  async searchProducts(query: string, page = 1): Promise<SearchResponse> {
    const { data } = await client.get('/cgi/search.pl', {
      params: {
        search_terms: query,
        json: true,
        page,
        page_size: 24,
      },
    });
    return data;
  },

  async getProductByBarcode(barcode: string): Promise<Product> {
    const { data } = await client.get(`/api/v0/product/${barcode}.json`);
    return data.product;
  },

  async getCategories(): Promise<string[]> {
    const { data } = await client.get('/categories.json');
    return data.tags.map((tag: any) => tag.name);
  },

  async getProductsByCategory(category: string, page = 1): Promise<SearchResponse> {
    const { data } = await client.get(`/category/${category}/${page}.json`);
    return data;
  },
};