import styled from "@emotion/styled";
import { FiHome } from "react-icons/fi";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #1c1c1c;
  color: #fff;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 120px;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin: 10px 0;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  opacity: 0.8;
`;

const HomeButton = styled.a`
  display: flex;
  align-items: center;
  background-color: #81C784;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #66BB6A;
  }
`;

const HomeIcon = styled(FiHome)`
  margin-right: 8px;
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <HomeButton href="/">
        <HomeIcon />
        Go Back Home
      </HomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
