import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";

const FormWrapper = styled.div`
  max-width: 100%;
  margin: 40px auto;
  padding: 20px 80px;
  background-color: #0c0404;
  border-radius: 20px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: rgb(255, 255, 255, 0.8);
`;

const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  color: #333;

  &:focus {
    outline: none;
    border: 2px solid #A5D6A7;
  }
`;

const Select = styled(Field)`
  width: 107%;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  color: #333;

  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "white")};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};

  &:focus {
    outline: none;
    border: 2px solid #A5D6A7;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 20px auto;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: #27ae60;
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#27ae60" : "#218c52")};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SmallLoader = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SongSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  artist: Yup.string().required("Artist is required"),
  album: Yup.string().required("Album is required"),
  genre: Yup.string().required("Please select a genre"),

  coverImage: Yup.mixed()
    .test("fileRequired", "Cover image is required", function (value) {
      if (typeof value === "string") {
        return true; 
      }
      return value instanceof File;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (typeof value === "string") {
        return true;
      }
      return value instanceof File && ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
    })
    .test("fileSize", "File too large. Max size is 1MB", (value) => {
      if (typeof value === "string") {
        return true;
      }
      return value instanceof File && value.size <= 1 * 1024 *1024;
    }),

  musicFile: Yup.mixed()
    .test("fileRequired", "Music file is required", function (value) {
      if (typeof value === "string") {
        return true; 
      }
      return value instanceof File;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (typeof value === "string") {
        return true;
      }
      return value instanceof File && ["audio/mpeg", "audio/wav"].includes(value.type);
    })
    .test("fileSize", "File too large. Max size is 4MB", (value) => {
      if (typeof value === "string") {
        return true;
      }
      return value instanceof File && value.size <= 4 * 1024 * 1024;
    }),
});

interface SongFormValues {
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImage: File | string;
  musicFile: File | string;
}

interface SongFormProps {
  initialValues: SongFormValues;
  formTitle: string;
  buttonText: string;
  onSubmit: (values: SongFormValues) => void;
  loading?: boolean;
}

const SongForm: React.FC<SongFormProps> = ({
  initialValues,
  formTitle,
  buttonText,
  onSubmit,
  loading = false,
}) => {

  return (
    <FormWrapper>
      <h3 style={{ textAlign: "center" }}>{formTitle}</h3>

      <Formik<SongFormValues>
        initialValues={initialValues}
        validationSchema={SongSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form id="songForm">
            <FormField>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter song title"
                disabled={loading}
                autoComplete="off"
              />
              <ErrorMessage name="title" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                name="artist"
                placeholder="Enter artist name"
                disabled={loading}
                autoComplete="off"
              />
              <ErrorMessage name="artist" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="album">Album</Label>
              <Input
                id="album"
                name="album"
                placeholder="Enter album name"
                disabled={loading}
                autoComplete="off"
              />
              <ErrorMessage name="album" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="genre">Genre</Label>
              <Select as="select" id="genre" name="genre" disabled={loading}>
                <option value="">Select genre</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="jazz">Jazz</option>
                <option value="electronic">Electronic</option>
                <option value="metal">Heavy Metal</option>
                <option value="reggae">Reggae</option>
                <option value="country">Country</option>
              </Select>
              <ErrorMessage name="genre" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="coverImage">Cover Image</Label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue("coverImage", file);
                }}
                disabled={loading}
              />
              <ErrorMessage name="coverImage" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="musicFile">Music File</Label>
              <input
                type="file"
                id="musicFile"
                name="musicFile"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue("musicFile", file);
                }}
                disabled={loading}
              />
              <ErrorMessage name="musicFile" component={ErrorText} />
            </FormField>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? <SmallLoader /> : buttonText}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default SongForm;
