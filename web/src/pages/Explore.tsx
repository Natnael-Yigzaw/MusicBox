import styled from "@emotion/styled";
import ExploreCard from "../components/ExploreCard";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ExploreTopSection = styled.div`
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

`;

const ExplorePage = () => {
  const genres = [
    { name: "Rock", color: "#004D40", img: "/images/rock.jpg" },
    { name: "Pop", color: "#4DB6AC", img: "/images/pop.jpg" },
    { name: "Jazz", color: "#BA68C8", img: "/images/jazz.jpg" },
    { name: "Electronic", color: "#009688", img: "/images/electronic.jpg" },
    { name: "Metal", color: "#FF3D00", img: "/images/heavy-metal.jpg" },
    { name: "Reggae", color: "#90A4AE", img: "/images/reggae.jpg" },
  ];

  const handleCardClick = (genreName: string) => {
    console.log(`Selected genre: ${genreName}`);
  };

  return (
    <PageContainer>
      <MainContent>
        <ExploreTopSection>
          Explore Genres
        </ExploreTopSection>
        <ScrollableContent>
          <CardGrid>
            {genres.map((genre) => (
              <ExploreCard
                key={genre.name}
                genre={genre.name}
                bgColor={genre.color}
                imgSrc={genre.img}
                onClick={() => handleCardClick(genre.name)}
              />
            ))}
          </CardGrid>
        </ScrollableContent>
      </MainContent>
    </PageContainer>
  );
};

export default ExplorePage;
