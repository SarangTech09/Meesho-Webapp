import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Product slice reducer
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filteredItems: [],
    currentSearchTerm: '',
    currentCategory: 'all'
  },
  reducers: {
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.currentSearchTerm = searchTerm;
      
      state.filteredItems = state.items.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
      );
    },
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.currentCategory = category;
      
      if (category === 'all') {
        state.filteredItems = state.items.filter(product => 
          product.title.toLowerCase().includes(state.currentSearchTerm)
        );
      } else {
        state.filteredItems = state.items.filter(product =>
          product.category.toLowerCase() === category.toLowerCase() &&
          product.title.toLowerCase().includes(state.currentSearchTerm)
        );
      }
    },
    
    // Reset all filters and search term
    resetSearch: (state) => {
      state.currentSearchTerm = '';
      state.filteredItems = state.items;
    },
    resetAllFilters: (state) => {
      state.currentSearchTerm = '';
      state.currentCategory = 'all';
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(product => ({
          ...product,
          image: product.image.replace(/^http:\/\//i, 'https://')
        }));
        state.filteredItems = state.items;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export const { 
  searchProducts, 
  filterByCategory, 
  resetSearch, 
  resetAllFilters 
} = productSlice.actions;

export default productSlice.reducer;