import React from "react";
import styled from "@emotion/styled";

const SongStatsContainer = styled.div`
  padding: 10px;
`;

const SectionTitle = styled.h2`
  color: rgb(255,255,255,0.8);
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

const SongStatisticCard: React.FC<{ songsByGenre: { _id: string; count: number }[] }> = ({ songsByGenre }) => {
  return (
    <SongStatsContainer>
      <SectionTitle>Songs by Genre</SectionTitle>
      <CardsContainer>
        {songsByGenre.map((genre) => (
          <Card key={genre._id} bgColor="#263238">
            <CardCount>{genre.count}</CardCount>
            <CardTitle>{genre._id}</CardTitle>
          </Card>
        ))}
      </CardsContainer>
    </SongStatsContainer>
  );
};

export default SongStatisticCard;
