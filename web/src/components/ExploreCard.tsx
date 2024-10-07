import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  border-radius: 15px;
  overflow: hidden;
  max-width: 60%;
  height: 100%;
  position: relative;
  padding: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const GenreTitle = styled.h3`
  color: white;
  font-size: 16px;
  margin: 0;
`;

const GenreImage = styled.img`
  position: absolute;
  bottom: -10px;
  right: -5px;
  width: 65px;
  height: 65px;
  border-radius: 15px;
  transform: rotate(30deg);
`;

interface ExploreCardProps {
  genre: string;
  bgColor: string;
  imgSrc: string;
  onClick: () => void;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ genre, bgColor, imgSrc, onClick }) => {
  return (
    <Card bgColor={bgColor} onClick={onClick}>
      <GenreTitle>{genre}</GenreTitle>
      <GenreImage src={imgSrc} alt={`Icon representing ${genre}`} />
    </Card>
  );
};

export default ExploreCard;
