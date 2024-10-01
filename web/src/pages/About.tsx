import React from "react";
import styled from "@emotion/styled";
import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiTypescript, SiMongodb } from "react-icons/si";

const FixedTopContainer = styled.div`
  position: sticky;
  z-index: 1;
  height: 5px;
  background-color: #1c1c1c;
  padding: 20px 30px;
  display: flex;
  align-items: left;
  justify-content: left;
  font-size: 22px;
  color: #fff;
  font-weight: bold;
`;

const AboutContainer = styled.div`
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

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
  color: #00bcd4;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: rgb(255,255,255,0.8);
`;

const FeaturesSection = styled.div`
  margin-bottom: 40px;
`;

const FeaturesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const FeatureCard = styled.div`
  background-color: #263238;
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const FeatureTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
  color: #00bcd4;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #ffffffcc;
`;

const TechSection = styled.div`
  margin-bottom: 40px;
`;

const TechTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #00bcd4;
`;

const TechIcons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const TechIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconLabel = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #ffffffcc;
`;

const TechIcon = styled.div`
  font-size: 48px;
  color: #00bcd4;
`;

const DeveloperSection = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const DeveloperTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #00bcd4;
`;

const DeveloperBio = styled.p`
  font-size: 16px;
  color: #ffffffcc;
`;

const ContactSection = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const ContactText = styled.p`
  font-size: 18px;
  color: #ffffffcc;
`;

const ContactLink = styled.a`
  color: #00bcd4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <>
      <FixedTopContainer></FixedTopContainer>

      <AboutContainer>
        <HeaderSection>
        <Title>About Music Box</Title>
          <Subtitle>Your go-to solution for music management and exploration.</Subtitle>
        </HeaderSection>

        <FeaturesSection>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureTitle>Manage Your Music</FeatureTitle>
              <FeatureDescription>Add, update, and organize your music library with ease.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Insightful Statistics</FeatureTitle>
              <FeatureDescription>View detailed insights on your music collection.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Explore By Genre</FeatureTitle>
              <FeatureDescription>Discover new music by browsing genres and artists.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Easy Navigation</FeatureTitle>
              <FeatureDescription>Enjoy an intuitive and smooth user experience.</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        <TechSection>
          <TechTitle>Built With</TechTitle>
          <TechIcons>
            <TechIconWrapper>
              <TechIcon>
                <FaReact />
              </TechIcon>
              <IconLabel>React</IconLabel>
            </TechIconWrapper>
            <TechIconWrapper>
              <TechIcon>
              <SiTypescript />
              </TechIcon>
              <IconLabel>Typescript</IconLabel>
            </TechIconWrapper>
            <TechIconWrapper>
              <TechIcon>
                <FaNodeJs />
              </TechIcon>
              <IconLabel>Node.js</IconLabel>
            </TechIconWrapper>
            <TechIconWrapper>
              <TechIcon>
                <SiMongodb />
              </TechIcon>
              <IconLabel>MongoDB</IconLabel>
            </TechIconWrapper>
            <TechIconWrapper>
              <TechIcon>
                <FaDocker />
              </TechIcon>
              <IconLabel>Docker</IconLabel>
            </TechIconWrapper>
          </TechIcons>
        </TechSection>

        <DeveloperSection>
          <DeveloperTitle>About the Developer</DeveloperTitle>
          <DeveloperBio>
            Developed by Natnael Yigzaw, a passionate full-stack developer specializing in the MERN stack.
          </DeveloperBio>
        </DeveloperSection>

        <ContactSection>
          <ContactText>Get in touch:</ContactText>
          <ContactLink href="mailto:natnaelky2020@gmail.com">natnaelky2020@gmail.com</ContactLink>
        </ContactSection>
      </AboutContainer>
    </>
  );
};

export default AboutPage;
