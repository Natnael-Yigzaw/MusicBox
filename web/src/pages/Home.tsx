import React from "react";
import Sidebar from "../components/SideBar";
import SearchInput from "../components/SearchInput";
import MusicCard from "../components/MusicCard";
import { FaHome } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { FcMusic } from "react-icons/fc";
import { IoStatsChartSharp } from "react-icons/io5";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  z-index: 2;
  @media (max-width: 768px) {
    width: 0;
  }
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
  const sidebarItems = [
    { label: "Home", icon: <FaHome size={24} />, path: "/" },
    {
      label: "Add Song",
      icon: <PiMusicNotesPlusFill size={24} />,
      path: "/add-song",
    },
    {
      label: "Statistics",
      icon: <IoStatsChartSharp size={24} />,
      path: "/statistics",
    },
    { label: "About", icon: <BsInfoCircle size={24} />, path: "/about" },
  ];

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

  const handleEdit = (songTitle: string) => {
    console.log("Edit song:", songTitle);
  };

  const handleDelete = (songTitle: string) => {
    console.log("Delete song:", songTitle);
  };

  const handlePlay = (songTitle: string) => {
    console.log("Play song:", songTitle);
  };

  return (
    <PageContainer>
      <SidebarWrapper>
        <Sidebar
          headerLabel="Music Box"
          headerIcon={<FcMusic size={32} />}
          items={sidebarItems}
        />
      </SidebarWrapper>
      <MainContent>
        <FixedTopSection>
          <SearchInput
            placeholder="What do you want to play?"
            onSearch={handleSearch}
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
                onEdit={() => handleEdit(song.title)}
                onDelete={() => handleDelete(song.title)}
                onPlay={() => handlePlay(song.title)}
              />
            ))}
          </CardGrid>
        </ScrollableContent>
      </MainContent>
    </PageContainer>
  );
};

export default Home;
