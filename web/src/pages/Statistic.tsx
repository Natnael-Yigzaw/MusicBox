import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/index";
import OverviewCard from "../components/OverviewStatisticCard";
import SongStatisticCard from "../components/SongStatisticCard";
import ArtistStatisticCard from "../components/ArtistStatisticCard";
import AlbumStatisticCard from "../components/AlbumStatisticCard";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { fetchStatisticsRequest } from '../store/slices/songSlice';

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
  const dispatch = useDispatch();
  const { statistics, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <StatisticsContainer>
      <FixedTopSection>
        Statistics
      </FixedTopSection>
      <ScrollableContent>
        {loading ? (
          <Loader />
        ) : (
          statistics && (
            <>
              <OverviewCard
                totalSongs={statistics.totalSongs}
                totalArtists={statistics.totalArtists}
                totalAlbums={statistics.totalAlbums}
                totalGenres={statistics.totalGenres}
              />
              <SongStatisticCard songsByGenre={statistics.songsByGenre} />
              <ArtistStatisticCard songsByArtist={statistics.songsByArtist} />
              <AlbumStatisticCard songsByAlbum={statistics.songsByAlbum} />
            </>
          )
        )}
      </ScrollableContent>
    </StatisticsContainer>
  );
};

export default StatisticsPage;
