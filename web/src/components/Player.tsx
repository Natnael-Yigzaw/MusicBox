import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface PlayerProps {
  currentSong: string | null;
  onEnded: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentSong, onEnded }) => {
  return (
    <>
      {currentSong && (
        <AudioPlayer
          autoPlay
          src={currentSong}
          onEnded={onEnded}
        />
      )}
    </>
  );
};

export default Player;
