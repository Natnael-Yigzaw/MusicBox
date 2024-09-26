import React from "react";
import styled from "@emotion/styled";
import { FaEdit, FaTrash, FaPlay } from "react-icons/fa";

interface MusicCardProps {
  coverImage: string;
  title: string;
  artist: string;
  onEdit: () => void;
  onDelete: () => void;
  onPlay: () => void;
}

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 10px;
  text-align: left;
`;

const Title = styled.h3`
  font-size: 16px;
  margin-top: -5px;
  margin-bottom: -10px;
  color: #fff;
`;

const Artist = styled.p`
  font-size: 14px;
  color: rgb(255, 255, 255, 0.6);
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
  margin-top: 20px;
`;

const EditButton = styled(FaEdit)`
  cursor: pointer;
  color: #b0bec5;

  &:hover {
    color: #f1c40f;
  }
`;

const DeleteButton = styled(FaTrash)`
  cursor: pointer;
  color: #b0bec5;

  &:hover {
    color: #d32f2f;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 15px;
  background-color: #2ecc71;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #27ae60;
  }

  & .play-icon {
    font-size: 18px;
  }
`;

const MusicCard: React.FC<MusicCardProps> = ({
  coverImage,
  title,
  artist,
  onEdit,
  onDelete,
  onPlay,
}) => {
  return (
    <Card>
      <CoverImage src={coverImage} alt={title} />
      <PlayButton onClick={onPlay}>
        <FaPlay className="play-icon" size={15} />
      </PlayButton>
      <CardContent>
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
        <ActionButtons>
          <EditButton onClick={onEdit} size={18} />
          <DeleteButton onClick={onDelete} size={18} />
        </ActionButtons>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
