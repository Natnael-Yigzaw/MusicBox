import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadSongRequest, fetchSongsRequest } from "../store/slices/songSlice";
import { RootState } from "../store";
import SongForm from "../components/SongForm";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UploadPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, data } = useSelector((state: RootState) => state.songs);
  const [uploadAttempted, setUploadAttempted] = useState(false);

  useEffect(() => {
    if (!loading && uploadAttempted && !error && data.length > 0) {
      navigate("/");
      toast.success("Song Uploaded Successfully", { toastId: "uploadSuccess" });
      setUploadAttempted(false);
      dispatch(fetchSongsRequest());
    }
  }, [loading, error, data, navigate, uploadAttempted, dispatch]);

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

    dispatch(uploadSongRequest(formData));
    setUploadAttempted(true);
  };

  return (
    <MainContent>
      <SongForm
        initialValues={{
          title: "",
          artist: "",
          album: "",
          genre: "",
          coverImage: "",
          musicFile: "",
        }}
        formTitle="Upload New Song"
        buttonText="Upload Song"
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && toast.error(error, { toastId: "uploadError" })}
    </MainContent>
  );
};

export default UploadPage;
