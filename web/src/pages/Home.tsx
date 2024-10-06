import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongsRequest,
  deleteSongRequest,
  searchSongsRequest,
} from "../store/slices/songSlice";
import { RootState } from "../store/index";
import { toast } from "react-toastify";
import SearchInput from "../components/SearchInput";
import MusicCard from "../components/MusicCard";
import Loader from "../components/Loader";
import styled from "@emotion/styled";
import Player from "../components/Player";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FixedTopSection = styled.div`
  position: sticky;
  z-index: 1;
  height: 70px;
  border: none;
  background-color: #1c1c1c;
  padding: 20px 30px;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 25px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 300px;
  text-align: center;

  h3 {
    margin-bottom: 5px;
  }

  button {
    margin: 0 5px;
    padding: 10px 20px;
    background-color: #ff4757;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff6b81;
    }
  }

  .cancel-button {
    background-color: #ccc;
    color: #333;

    &:hover {
      background-color: #bbb;
    }
  }
`;

const CenteredMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;

  h3 {
    margin-bottom: 20px;
    color: #ffffff;
  }

  button {
    padding: 10px 20px;
    background-color: #78909C;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #607D8B;
    }
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [songIdToDelete, setSongIdToDelete] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "fetchError",
      });
    }
  }, [error]);

  const handleSearch = (query: string) => {
    if (query) {
      dispatch(searchSongsRequest(query));
    }
  };

  const handleDelete = (songId: string) => {
    setSongIdToDelete(songId);
    setAlertVisible(true);
  };

  const confirmDelete = () => {
    if (songIdToDelete) {
      dispatch(deleteSongRequest(songIdToDelete));
      toast.success("Song deleted successfully", {toastId: "deleteSuccess"});
      setSongIdToDelete(null);
      setAlertVisible(false);
    }
  };

  const cancelDelete = () => {
    setSongIdToDelete(null);
    setAlertVisible(false);
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handlePlay = (songUrl: string) => {
    setCurrentSong(songUrl);
  };

  const handlePlayerEnded = () => {
    setCurrentSong(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <MainContent>
        <FixedTopSection>
          <SearchInput
            placeholder="What do you want to play?"
            onSearch={handleSearch}
            onUploadClick={handleUploadClick}
          />
        </FixedTopSection>
        <ScrollableContent>
          {songs.length === 0 ? (
            <CenteredMessage>
              <h3>Upload Your First Song!</h3>
              <button onClick={handleUploadClick}>Upload Song</button>
            </CenteredMessage>
          ) : (
            <CardGrid>
              {songs.map((song, index) => (
                <MusicCard
                  key={index}
                  coverImage={song.coverImage.secure_url}
                  title={song.title}
                  artist={song.artist}
                  onEdit={() => navigate(`/update/${song._id}`, { state: song })}
                  onDelete={() => handleDelete(song._id)}
                  onPlay={() => handlePlay(song.musicFile.secure_url)}
                />
              ))}
            </CardGrid>
          )}
        </ScrollableContent>
        {isAlertVisible && (
          <StyledAlert>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this song?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button className="cancel-button" onClick={cancelDelete}>
              Cancel
            </button>
          </StyledAlert>
        )}
        <Player currentSong={currentSong} onEnded={handlePlayerEnded} />
      </MainContent>
    </PageContainer>
  );
};

export default Home;
