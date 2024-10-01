import React from "react";
import styled from "@emotion/styled";

const OverviewContainer = styled.div`
  padding: 10px;
`;

const OverviewCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Card = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  padding: 20px;
  width: 100px;
  height: 100px;
  color: white;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  color: rgb(255,255,255,0.8);
  margin: 10px 0 0 0;
`;

const CardCount = styled.p`
  font-size: 20px;
  margin: 20px 0 0 0;
  font-weight: bold;
`

const OverviewCard: React.FC<{
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}> = ({ totalSongs, totalArtists, totalAlbums, totalGenres }) => {
  return (
    <OverviewContainer>
      <OverviewCardContainer>
        <Card bgColor="#673AB7">
          <CardCount>{totalSongs}</CardCount>
          <CardTitle>Songs</CardTitle>
        </Card>
        <Card bgColor="#4DD0E1">
          <CardCount>{totalArtists}</CardCount>
          <CardTitle>Artists</CardTitle>
        </Card>
        <Card bgColor="#FFA726">
          <CardCount>{totalAlbums}</CardCount>
          <CardTitle>Albums</CardTitle>
        </Card>
        <Card bgColor="#009688">
          <CardCount>{totalGenres}</CardCount>
          <CardTitle>Genres</CardTitle>
        </Card>
      </OverviewCardContainer>
    </OverviewContainer>
  );
};

export default OverviewCard;
