import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSongRequest, fetchSongsRequest } from "../store/slices/songSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { Song } from "../types";
import SongForm from "../components/SongForm";
import styled from "@emotion/styled";

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UpdatePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.songs);
  const [updateAttempted, setUpdateAttempted] = useState(false);
  
  const song = location.state as Song;

  useEffect(() => {
    if (!loading && updateAttempted && !error) {
      navigate("/");
      toast.success("Song updated successfully", { toastId: "updateSuccess" });
      dispatch(fetchSongsRequest());
    }
  }, [loading, error, navigate, updateAttempted, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { toastId: "updateError" });
    }
  }, [error]);

  const handleSubmit = (values: { [key: string]: any }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("artist", values.artist);
    formData.append("album", values.album);
    formData.append("genre", values.genre);
    if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }
      if (values.musicFile) {
        formData.append("musicFile", values.musicFile);
    }

    dispatch(updateSongRequest({ songId: song._id, formData }));
    setUpdateAttempted(true);
  };

  return (
    <MainContent>
      <SongForm
        initialValues={{
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
          coverImage: song.coverImage.secure_url,
          musicFile: song.musicFile.secure_url,
        }}
        formTitle="Update Song"
        buttonText="Update Song"
        onSubmit={handleSubmit}
        loading={loading}
      />
    </MainContent>
  );
};

export default UpdatePage;
