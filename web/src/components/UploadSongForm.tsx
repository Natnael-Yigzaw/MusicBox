import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const FormWrapper = styled.div`
  max-width: 100%;
  margin: 40px auto;
  padding: 20px 80px;
  background-color: #0C0404;
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
  color: rgb(255,255,255,0.8);
`;

const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: rgb(255,255,255,0.9);
  color: #333;
  
  &:focus {
    outline: none;
    border: 2px solid #27ae60;
  }
`;

const Select = styled(Field)`
  width: 107%;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: rgb(255,255,255,0.9);
  color: #333;

  &:focus {
    outline: none;
    border: 2px solid #27ae60;
  }
`;

const FileInput = styled.input`
  display: block;
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
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218c52;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const UploadSongSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  artist: Yup.string().required('Artist is required'),
  album: Yup.string().required('Album is required'),
  genre: Yup.string().required('Please select a genre'),
  coverImage: Yup.mixed()
    .required('Cover image is required')
    .test('fileType', 'Unsupported file format', (value) => {
      return value && value instanceof File && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
    }),
  musicFile: Yup.mixed()
    .required('Music file is required')
    .test('fileType', 'Unsupported file format', (value) => {
      return value && value instanceof File && ['audio/mpeg', 'audio/wav'].includes(value.type);
    }),
});

interface UploadSongFormValues {
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImage: File | null;
  musicFile: File | null;
}

const UploadSongForm: React.FC = () => {
  const navigate = useNavigate();
  return (
    <FormWrapper>
      <h3 style={{ textAlign: 'center' }}>Upload New Song</h3>
      <Formik<UploadSongFormValues>
        initialValues={{
          title: '',
          artist: '',
          album: '',
          genre: '',
          coverImage: null,
          musicFile: null,
        }}
        validationSchema={UploadSongSchema}
        onSubmit={(values) => {
          console.log('Form Data', values);
          setTimeout(() => {
            navigate('/');
          }, 500);
        }}
      >
        {({ setFieldValue }) => (
          <Form id="uploadForm">
            <FormField>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter song title" />
              <ErrorMessage name="title" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="artist">Artist</Label>
              <Input id="artist" name="artist" placeholder="Enter artist name" />
              <ErrorMessage name="artist" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="album">Album</Label>
              <Input id="album" name="album" placeholder="Enter album name" />
              <ErrorMessage name="album" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="genre">Genre</Label>
              <Select as="select" id="genre" name="genre">
                <option value="">Select genre</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="jazz">Jazz</option>
                <option value="hiphop">Electronic</option>
                <option value="hiphop">Heavy Metal</option>
                <option value="hiphop">Reggae</option>
                <option value="hiphop">Country</option>

              </Select>
              <ErrorMessage name="genre" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="coverImage">Cover Image</Label>
              <FileInput
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue('coverImage', file);
                }}
              />
              <ErrorMessage name="coverImage" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="musicFile">Music File</Label>
              <FileInput
                type="file"
                id="musicFile"
                name="musicFile"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue('musicFile', file);
                }}
              />
              <ErrorMessage name="musicFile" component={ErrorText} />
            </FormField>

            <SubmitButton type="submit">Upload Song</SubmitButton>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default UploadSongForm;
