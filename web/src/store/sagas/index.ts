import { all } from 'redux-saga/effects';
import { watchFetchSongs, watchUploadSong, watchUpdateSong, watchDeleteSong, watchSearchSongs, watchExploreGenre, watchFetchStatistics } from './songSaga';

function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchUploadSong(),
    watchUpdateSong(),
    watchDeleteSong(),
    watchSearchSongs(),
    watchExploreGenre(),
    watchFetchStatistics()
  ]);
}

export default rootSaga;
