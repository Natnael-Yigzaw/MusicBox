import { all } from 'redux-saga/effects';
import { watchFetchSongs, watchUploadSong, watchUpdateSong, watchDeleteSong, watchSearchSongs } from './songSaga';

function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchUploadSong(),
    watchUpdateSong(),
    watchDeleteSong(),
    watchSearchSongs(),
  ]);
}

export default rootSaga;
