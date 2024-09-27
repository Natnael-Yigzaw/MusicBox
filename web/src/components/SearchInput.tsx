import React, { useState } from "react";
import styled from "@emotion/styled";
import { CiSearch } from "react-icons/ci";
import { FaUpload } from "react-icons/fa";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  onUploadClick: () => void;
}

const SearchUploadContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  border-radius: 50px;
  padding: 6px;
  background-color: rgb(255,255,255,0.9);

  @media (max-width: 768px) {
    max-width: 75%;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
  font-size: 14px;
  padding: 8px;
  background-color: transparent;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  margin-left: 50%;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    flex-grow: 0;
    padding: 15px 15px;
    margin-left: 10px;
  }
`;

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  onUploadClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchUploadContainer>
      <InputContainer>
        <CiSearch size={20} onClick={handleSearch} />
        <Input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputContainer>
      <UploadButton onClick={onUploadClick}>
        <FaUpload style={{ marginRight: "8px" }} /> Upload
      </UploadButton>
    </SearchUploadContainer>
  );
};

export default SearchInput;
