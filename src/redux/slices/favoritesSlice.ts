import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import axios from 'axios';
interface FavoriteItem {
  id: number;
  price: string;
  tags: [];
  thumbnail: string;
  title: string;
  description: string;
  isFavorited?:boolean
}

interface FavoritesState {
  items: FavoriteItem[];
  favItems: FavoriteItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  favItems: loadFavoritesFromLocalStorage() || [],
  status: 'idle',
  error: null,
};

function loadFavoritesFromLocalStorage(): FavoriteItem[] | null {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState) as FavoriteItem[]; // Parse JSON and cast to FavoriteItem[]
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return null;
  }
}

function saveFavoritesToLocalStorage(favorites: FavoriteItem[]) {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:',
      error);
  }
}


export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const response = await axios.get('https://dummyjson.com/products');
    const data = await response?.data?.products;
    return data as FavoriteItem[];
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state?.favItems?.push({...action.payload, isFavorited:true});
      saveFavoritesToLocalStorage(state?.favItems || []);
      alert("Product Added In Wishlist");
    },
    undoFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state.favItems = state?.favItems?.filter(item => item.id !== action.payload?.id) || [];
      saveFavoritesToLocalStorage(state?.favItems || []);
      alert("Product Removed From Wishlist");
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favItems = state?.favItems?.filter(item => item.id !== action.payload) || [];
      saveFavoritesToLocalStorage(state.favItems);
      alert(("Product Removed From Wishlist"));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<FavoriteItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload.map((item) => ({ ...item, isFavorited: false }));
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch favorite items';
      });
  },
});

export const { addFavorite, removeFavorite, undoFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const allProducts = (state: RootState) => state.favorites.items;
export const selectFavorites = (state: RootState) => state.favorites.favItems;
export const selectFavoritesStatus = (state: RootState) => state.favorites.status;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
