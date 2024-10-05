import React from "react";
import styled from "@emotion/styled";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loading = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 8px solid #ffffff;
  width: 20px;
  height: 20px;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <Loading />
    </LoaderWrapper>
  );
};

export default Loader;
