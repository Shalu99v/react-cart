import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products?limit=20');
    const data = await response.json();
    return data;
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async searchTerm => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    error: null,
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = action.error.message;
      });
  },
});
export const {setProducts} = productsSlice.actions;
export default productsSlice.reducer;
