import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import MusicCard from "../components/MusicCard";
import UploadSongForm from "../components/UploadSongForm";
import ExplorePage from "../pages/Explore";
import styled from "@emotion/styled";

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

const Home: React.FC = () => {
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
  const [isExploreVisible, setIsExploreVisible] = useState(false);
  const navigate = useNavigate();

  const mockSongs = [
    {
      coverImage:
        "https://www.okayafrica.com/media-library/rophnan-sidist.jpg?id=30180718&width=1245&height=700&quality=85&coordinates=0%2C437%2C0%2C437",
      title: "Shegiye",
      artist: "Rophnan",
    },
  ];

  const handleSearch = (value: string) => {
    console.log("Search term:", value);
  };

  const handleUploadClick = () => {
    setIsUploadFormVisible((prev) => !prev);
    setIsExploreVisible(false);
    navigate("/upload");
  };

  return (
    <PageContainer>
      <MainContent>
        {isUploadFormVisible ? (
          <UploadSongForm />
        ) : isExploreVisible ? (
          <ExplorePage />
        ) : (
          <>
            <FixedTopSection>
              <SearchInput
                placeholder="What do you want to play?"
                onSearch={handleSearch}
                onUploadClick={handleUploadClick}
              />
            </FixedTopSection>
            <ScrollableContent>
              <CardGrid>
                {mockSongs.map((song) => (
                  <MusicCard
                    key={song.title}
                    coverImage={song.coverImage}
                    title={song.title}
                    artist={song.artist}
                    onEdit={() => console.log("Edit song:", song.title)}
                    onDelete={() => console.log("Delete song:", song.title)}
                    onPlay={() => console.log("Play song:", song.title)}
                  />
                ))}
              </CardGrid>
            </ScrollableContent>
          </>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default Home;
