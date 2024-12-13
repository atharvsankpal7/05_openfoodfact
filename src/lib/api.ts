import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org';

export interface Product {
  code: string;
  product_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutrition_grades: string;
  nutriments: {
    energy_100g: number;
    fat_100g: number;
    carbohydrates_100g: number;
    proteins_100g: number;
  };
  labels: string;
  image_front_url: string;
}

export interface SearchResponse {
  products: Product[];
  count: number;
  page: number;
  page_size: number;
}

export const api = {
  async getAllProducts(page = 1): Promise<SearchResponse> {
    const response = await axios.get(`${BASE_URL}/cgi/search.pl`, {
      params: {
        json: true,
        page,
        page_size: 24,
        sort_by: 'popularity_key',
      },
    });
    return response.data;
  },

  async searchProducts(query: string, page = 1): Promise<SearchResponse> {
    const response = await axios.get(`${BASE_URL}/cgi/search.pl`, {
      params: {
        search_terms: query,
        json: true,
        page,
        page_size: 24,
      },
    });
    return response.data;
  },

  async getProductByBarcode(barcode: string): Promise<Product> {
    const response = await axios.get(`${BASE_URL}/api/v3/product/${barcode}.json`);
    return response.data.product;
  },

  async getCategories(): Promise<string[]> {
    const response = await axios.get(`${BASE_URL}/categories.json`);
    return response.data.tags.map((tag: any) => tag.name);
  },

  async getProductsByCategory(category: string, page = 1): Promise<SearchResponse> {
    const response = await axios.get(`${BASE_URL}/category/${category}/${page}.json`);
    return response.data;
  },
};