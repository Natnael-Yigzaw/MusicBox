import axios from "axios";
import { Song } from "../types";

const API_BASE_URL = "https://musicbox-6pes.onrender.com/api/songs";

export const fetchSongs = async (): Promise<{
  success: boolean;
  count: number;
  data: Song[];
}> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const uploadSong = async (formData: FormData): Promise<{
  success: boolean;
  message: string;
  data : Song;
}> => {
    const response = await axios.post(API_BASE_URL, formData);
    return response.data;
};

export const updateSong = async (
  songId: string,
  formData: FormData
): Promise<{
  message: string;
  song: Song;
}> => {
  const response = await axios.put(`${API_BASE_URL}/${songId}`, formData);
  return response.data;
};

export const deleteSong = async (
  songId: string
): Promise<{
  message: string;
}> => {
  const response = await axios.delete(`${API_BASE_URL}/${songId}`);
  return response.data;
}

export const searchSongs = async (query: string): Promise<{
  success: boolean;
  count: number;
  data: Song[];
}> => {
  const response = await axios.get(`${API_BASE_URL}/search`, {
    params: { query },
  });
  return response.data;
};