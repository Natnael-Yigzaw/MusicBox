import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaBars, FaTimes } from 'react-icons/fa';

interface SidebarProps {
  items: Array<{ label: string; icon: JSX.Element; path: string }>;
  headerLabel: string;
  headerIcon: JSX.Element;
}

const SidebarContainer = styled.nav<{ isOpen: boolean }>`
  height: 100vh;
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: #0C0404;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 200px;
  }

  @media (min-width: 1024px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;

  & > svg {
    margin-right: 12px;
  }
`;

const SidebarItem = styled.a`
  display: flex;
  align-items: center;
  padding: 8px 25px;
  color: rgb(255,255,255,0.9);
  font-size: 16px;
  text-decoration: none;
  margin-top: 30px;
  border-radius: 8px;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #444;
    transform: translateX(5px);
  }

  &:active {
    transform: translateX(2px);
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 12px 20px;
    font-size: 16px;
  }
`;

const IconContainer = styled.span`
  margin-right: 12px;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-right: 8px;
  }
`;

const HamburgerIcon = styled.div`
  position: fixed;
  top: 10px;
  left: 12px;
  font-size: 20px;
  z-index: 1000;
  cursor: pointer;

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Sidebar: React.FC<SidebarProps> = ({ items, headerLabel, headerIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HamburgerIcon onClick={toggleSidebar}>
        {isOpen ? <FaTimes color='#fff' /> : <FaBars color='#fff' />}
      </HamburgerIcon>

      <SidebarContainer isOpen={isOpen}>
        <StyledLink to="/">
        <SidebarHeader>
          {headerIcon}
          {headerLabel}
        </SidebarHeader>
        </StyledLink>
        {items.map((item) => (
          <SidebarItem href={item.path} key={item.label}>
            <IconContainer>{item.icon}</IconContainer>
            {item.label}
          </SidebarItem>
        ))}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
