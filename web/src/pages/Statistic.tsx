import React from "react";
import styled from "@emotion/styled";
import OverviewCard from "../components/OverviewStatisticCard";
import SongStatisticCard from "../components/SongStatisticCard";
import ArtistStatisticCard from "../components/ArtistStatisticCard";
import AlbumStatisticCard from "../components/AlbumStatisticCard";

const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const FixedTopSection = styled.div`
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

const StatisticsPage: React.FC = () => {
  const sampleData = {
    totalSongs: 1,
    totalArtists: 1,
    totalAlbums: 1,
    totalGenres: 1,
    songsByGenre: [
      { _id: "Rock", count: 1 },
      { _id: "Pop", count: 1 },
      { _id: "Jazz", count: 2 },
      { _id: "Electronic", count: 1 },
    ],
    songsByArtist: [
      { artist: "Rophnan", songCount: 1, albumCount: 1 },
    ],
    songsByAlbum: [
      { _id: "SIDIST", count: 1 }
    ]
  };

  return (
    <StatisticsContainer>
      <FixedTopSection>
        Statistics
      </FixedTopSection>
      <ScrollableContent>
        <OverviewCard
          totalSongs={sampleData.totalSongs}
          totalArtists={sampleData.totalArtists}
          totalAlbums={sampleData.totalAlbums}
          totalGenres={sampleData.totalGenres}
        />
        <SongStatisticCard songsByGenre={sampleData.songsByGenre} />
        <ArtistStatisticCard songsByArtist={sampleData.songsByArtist} />
        <AlbumStatisticCard songsByAlbum={sampleData.songsByAlbum} />
      </ScrollableContent>
    </StatisticsContainer>
  );
};

export default StatisticsPage;
