import { useState, useEffect } from "react";
import {
  HeaderWrapper,
  LayoutWrapper,
  MainWrapper,
  SidebarWrapper,
} from "./Layout.style";
import Sidebar from "components/Layout/Sidebar";
import Header from "components/Layout/Header";
import TopBanner from "./TopBanner";
import Article from "./Article";

const BANNER_CLOSED_KEY = "topBannerClosed";

export default function Layout() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isClosed = sessionStorage.getItem(BANNER_CLOSED_KEY);
    setShowBanner(!isClosed);
  }, []);

  const handleCloseBanner = () => {
    sessionStorage.setItem(BANNER_CLOSED_KEY, "true");
    setShowBanner(false);
  };

  return (
    <LayoutWrapper>
      {showBanner && <TopBanner onClose={handleCloseBanner} />}
      <HeaderWrapper $hasBanner={showBanner}>
        <Header />
      </HeaderWrapper>
      <SidebarWrapper $hasBanner={showBanner}>
        <Sidebar />
      </SidebarWrapper>
      <MainWrapper $hasBanner={showBanner}>
        <Article />
      </MainWrapper>
    </LayoutWrapper>
  );
}
