// src/store/posts.store.js
import axios from 'axios';
import { create } from 'zustand';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const useCampainStore = create((set) => ({
  campains: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);

      set({
        campains: response.data, // מערך הפוסטים מה-API
        isLoading: false,
      });

      return response.data; // אם תרצי להשתמש בו ישירות בקומפוננטה
    } catch (err) {
      console.error(err);
      set({
        isLoading: false,
        error:
          err.response?.data?.message || err.message || 'Error fetching posts',
      });
      throw err;
    }
  },
}));
