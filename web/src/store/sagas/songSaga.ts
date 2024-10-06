import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '../slices/songSlice';
import { fetchSongs, uploadSong, updateSong, deleteSong, searchSongs } from '../../api/songApi';
import { Song } from '../../types';

interface FetchSongsResponse {
  success: boolean;
  count: number;
  data: Song[];
}

interface UploadSongResponse {
  success: boolean;
  message: string;
  data: Song;
}

interface UpdateSongResponse {
  message: string;
  song: Song;
}

interface DeleteSongResponse {
  message: string;
}

function* handleFetchSongs(): Generator<any, void, FetchSongsResponse> {
  try {
    const response: FetchSongsResponse = yield call(fetchSongs);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    } else {
      yield put(fetchSongsFailure('An unknown error occurred'));
    }
  }
}

function* handleUploadSong(action: PayloadAction<FormData>): Generator<any, void, UploadSongResponse> {
  try {
    const response: UploadSongResponse = yield call(uploadSong, action.payload);
    if (response.success) {
      yield put(uploadSongSuccess(response.data));
    } else {
      yield put(uploadSongFailure("Upload failed: " + response.message));
    }
  } catch (error) {
    if (error instanceof Error) {
    yield put(uploadSongFailure(error.message || "An error occurred"));
    } else {
      yield put(searchSongsFailure('An unknown error occurred'));
    }
  }
}

function* handleUpdateSong(action: PayloadAction<{ songId: string; formData: FormData }>): Generator<any, void, UpdateSongResponse> {
  try {
    const response: UpdateSongResponse = yield call(updateSong, action.payload.songId, action.payload.formData);
    yield put(updateSongSuccess({ song: response.song }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateSongFailure(error.message || "An error occurred"));
    } else {
      yield put(updateSongFailure('An unknown error occurred'));
    }
  }
}

function* handleDeleteSong(action: PayloadAction<string>): Generator<any, void, DeleteSongResponse> {
  try {
    const response: DeleteSongResponse = yield call(deleteSong, action.payload);
    if (response.message) {
      yield put(deleteSongSuccess(action.payload));
    } else {
      yield put(deleteSongFailure('Deletion failed'));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteSongFailure(error.message || "An error occurred"));
    } else {
      yield put(deleteSongFailure('An unknown error occurred'));
    }
  }
}

function* handleSearchSong(action: PayloadAction<string>): Generator<any, void, FetchSongsResponse> {
  try {
    const response: FetchSongsResponse = yield call(searchSongs, action.payload);
    yield put(searchSongsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(searchSongsFailure(error.message));
    } else {
      yield put(searchSongsFailure('An unknown error occurred'));
    }
  }
}

export function* watchFetchSongs() {
  yield takeLatest(fetchSongsRequest.type, handleFetchSongs);
}

export function* watchUploadSong() {
  yield takeLatest(uploadSongRequest.type, handleUploadSong);
}

export function* watchUpdateSong() {
  yield takeLatest(updateSongRequest.type, handleUpdateSong);
}

export function* watchDeleteSong() {
  yield takeLatest(deleteSongRequest.type, handleDeleteSong);
}

export function* watchSearchSongs() {
  yield takeLatest(searchSongsRequest.type, handleSearchSong);
}
