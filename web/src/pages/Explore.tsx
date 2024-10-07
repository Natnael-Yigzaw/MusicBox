import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { exploreGenreRequest, deleteSongRequest } from "../store/slices/songSlice";
import { RootState } from "../store/index";
import { toast } from "react-toastify";
import { IoIosArrowRoundBack } from "react-icons/io";
import ExploreCard from "../components/ExploreCard";
import MusicCard from "../components/MusicCard";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Alert from "../components/Alert";

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ExploreTopSection = styled.div`
  position: sticky;
  z-index: 1;
  height: 5px;
  background-color: #1c1c1c;
  padding: 35px 30px;
  display: flex;
  align-items: left;
  justify-content: left;
  font-size: 22px;
  color: #fff;
  font-weight: bold;
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
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 65px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 65px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 65px;
  }
`;

const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoSongsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
  color: #ffffff;
`;

const ExplorePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genres = [
    { name: "Rock", color: "#004D40", img: "/images/rock.jpg" },
    { name: "Pop", color: "#4DB6AC", img: "/images/pop.jpg" },
    { name: "Jazz", color: "#BA68C8", img: "/images/jazz.jpg" },
    { name: "Electronic", color: "#009688", img: "/images/electronic.jpg" },
    { name: "Metal", color: "#FF3D00", img: "/images/heavy-metal.jpg" },
    { name: "Reggae", color: "#90A4AE", img: "/images/reggae.jpg" },
  ];

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { data: songs, loading, error } = useSelector((state: RootState) => state.songs);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [songIdToDelete, setSongIdToDelete] = useState<string | null>(null);
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleCardClick = (genre: string) => {
    setSelectedGenre(genre);
    dispatch(exploreGenreRequest(genre));
  };

  const handleBackToGenres = () => {
    setSelectedGenre(null);
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

  const handlePlay = (songUrl: string) => {
    setCurrentSong(songUrl);
  };

  const handlePlayerEnded = () => {
    setCurrentSong(null);
  };

  return (
      <MainContent>
        <ExploreTopSection>
          {selectedGenre ? `Explore ${selectedGenre} Songs` : "Explore Genres"}
        </ExploreTopSection>
        <ScrollableContent>
          {selectedGenre ? (
            <>
              <BackButton onClick={handleBackToGenres}>
                <IoIosArrowRoundBack size={30} />
              </BackButton>
              {loading ? (
                <Loader />
              ) : error ? (
                toast.error(error, { toastId: "exploreError" })
              ) : songs.length === 0 ? (
                <NoSongsMessage>
                  {`No song found with ${selectedGenre} genre. Explore other genres.`}
                </NoSongsMessage>
              ) : (
                <CardGrid>
                  {songs.map((song) => (
                    <MusicCard
                      key={song._id}
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
            </>
          ) : (
            <CardGrid>
              {genres.map((genre) => (
                <ExploreCard
                  key={genre.name}
                  genre={genre.name}
                  bgColor={genre.color}
                  imgSrc={genre.img}
                  onClick={() => handleCardClick(genre.name)}
                />
              ))}
            </CardGrid>
          )}
        </ScrollableContent>
        {isAlertVisible && (
          <Alert
            title="Confirm Delete"
            message="Are you sure you want to delete this song?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
        <Player currentSong={currentSong} onEnded={handlePlayerEnded} />
      </MainContent>
  );
};

export default ExplorePage;