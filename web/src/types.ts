export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImage: {
    public_id: string;
    secure_url: string;
  };
  musicFile: {
    public_id: string;
    secure_url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

export interface SongStatisticsResponse {
  success: boolean;
  data: {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    songsByGenre: { _id: string; count: number }[];
    songsByArtist: { songCount: number; artist: string; albumCount: number }[];
    songsByAlbum: { _id: string; count: number }[];
  };
}
