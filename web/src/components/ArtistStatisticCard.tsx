import React from "react";
import styled from "@emotion/styled";
import { FaMusic, FaCompactDisc } from "react-icons/fa";

const ArtistStatsContainer = styled.div`
  padding: 10px;
`;

const SectionTitle = styled.h2`
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin: 20px 0 0 0;
`;

const CardsContainer = styled.div`
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const IconRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  margin-top: 25px;
`;

const StatText = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  color: rgb(255,255,255,0.8);
  gap: 5px;
`;

const ArtistStatisticCard: React.FC<{
  songsByArtist: { artist: string; songCount: number; albumCount: number }[];
}> = ({ songsByArtist }) => {
  return (
    <ArtistStatsContainer>
      <SectionTitle>Songs by Artist</SectionTitle>
      <CardsContainer>
        {songsByArtist.map((artist) => (
          <Card key={artist.artist} bgColor="#263238">
            <CardTitle>{artist.artist}</CardTitle>
            <IconRow>
              <StatText>
                <FaMusic /> {artist.songCount}
              </StatText>
              <StatText>
                <FaCompactDisc /> {artist.albumCount}
              </StatText>
            </IconRow>
          </Card>
        ))}
      </CardsContainer>
    </ArtistStatsContainer>
  );
};

export default ArtistStatisticCard;
