import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types';

interface SongState {
  data: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  data: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadSongRequest: (state, _action: PayloadAction<FormData>) => {
        state.loading = true;
        state.error = null;
      },
    uploadSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    uploadSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongRequest: (state, _action: PayloadAction<{ songId: string; formData: FormData }>) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<{ song: Song }>) => {
      state.loading = false;
      const index = state.data.findIndex(song => song._id === action.payload.song._id);
      if (index >= 0) {
        state.data[index] = action.payload.song;
      }
    },    
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state.data.filter(song => song._id !== action.payload);
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },    
    searchSongsRequest: (state, _action: PayloadAction<string>) => {
      state.loading = false;
      state.error = null;
    },
    searchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    searchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  uploadSongRequest,
  uploadSongSuccess,
  uploadSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  searchSongsRequest,
  searchSongsSuccess,
  searchSongsFailure,
} = songSlice.actions;

export default songSlice.reducer;
