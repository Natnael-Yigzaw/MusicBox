import Sidebar from "../components/SideBar";
import styled from "@emotion/styled";
import { FaHome } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { FaWpexplorer } from "react-icons/fa6";
import { FcMusic } from "react-icons/fc";
import { IoStatsChartSharp } from "react-icons/io5";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  z-index: 2;
  @media (max-width: 768px) {
    width: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sidebarItems = [
    { label: "Home", icon: <FaHome size={24} />, path: "/" },
    { label: "Explore", icon: <FaWpexplorer size={24} />, path: "/explore" },
    { label: "Statistics", icon: <IoStatsChartSharp size={24} />, path: "/statistics" },
    { label: "About", icon: <BsInfoCircle size={24} />, path: "/about" },
  ];

  return (
    <PageContainer>
      <SidebarWrapper>
      <Sidebar headerLabel="Music Box" headerIcon={<FcMusic size={32} />} items={sidebarItems} />
      </SidebarWrapper>
      <MainContent>{children}</MainContent>
    </PageContainer>
  );
};

export default Layout;
