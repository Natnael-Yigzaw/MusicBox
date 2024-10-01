import React from "react";
import styled from "@emotion/styled";
import { FaMusic } from "react-icons/fa";

const AlbumStatsContainer = styled.div`
  padding: 10px;
`;

const SectionTitle = styled.h2`
  color: rgb(255, 255, 255, 0.8);
  font-size: 18px;
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
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin: 25px 0 0 0;
  text-align: center;
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const IconWrapper = styled.div`
  color: rgb(255,255,255,0.8);
`;

const CardCount = styled.p`
  font-size: 18px;
  margin: 0;
  color: rgb(255,255,255,0.8);
`;

const AlbumStatisticCard: React.FC<{ songsByAlbum: { _id: string; count: number }[] }> = ({
  songsByAlbum,
}) => {
  return (
    <AlbumStatsContainer>
      <SectionTitle>Songs by Album</SectionTitle>
      <CardsContainer>
        {songsByAlbum.map((album) => (
          <Card key={album._id} bgColor="#263238">
            <CardTitle>{album._id}</CardTitle>
            <CardBottom>
              <IconWrapper>
                <FaMusic />
              </IconWrapper>
              <CardCount>{album.count}</CardCount>
            </CardBottom>
          </Card>
        ))}
      </CardsContainer>
    </AlbumStatsContainer>
  );
};

export default AlbumStatisticCard;
