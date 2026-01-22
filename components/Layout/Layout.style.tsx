import styled from "@emotion/styled";
import { breakpoint } from "lib/breakpoint";
import {
  ASIDE_WIDTH,
  HEADER_HEIGHT,
  TOP_BANNER_HEIGHT,
  PAGE_LEFT_PADDING,
  PAGE_RIGHT_PADDING,
} from "lib/layout";
import { scrollbar } from "lib/scrollbar";

interface LayoutProps {
  $hasBanner?: boolean;
}

export const LayoutWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled("header")<LayoutProps>`
  height: 64px;
  z-index: 10;
  width: 100%;
  position: fixed;
  top: ${({ $hasBanner }) => ($hasBanner ? TOP_BANNER_HEIGHT : "0")};
  left: 0;
  box-sizing: border-box;

  padding-left: ${PAGE_LEFT_PADDING};
  padding-right: ${PAGE_RIGHT_PADDING};
  border-bottom: 1px solid var(--bg-opacity-color);
  transition: top 0.3s ease;
`;

export const SidebarWrapper = styled("aside")<LayoutProps>`
  z-index: 10;
  position: fixed;
  top: ${({ $hasBanner }) =>
    $hasBanner ? `calc(${HEADER_HEIGHT} + ${TOP_BANNER_HEIGHT})` : HEADER_HEIGHT};
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: ${ASIDE_WIDTH};
  overflow-y: scroll;
  border-right: 1px solid var(--bg-opacity-color);

  padding-right: 0.5rem;
  @media (max-width: ${breakpoint.desktop}) {
    display: none;
  }
  transition: top 0.3s ease;

  ${scrollbar}
`;

export const MainWrapper = styled("main")<LayoutProps>`
  flex: 1;
  padding-top: ${({ $hasBanner }) =>
    $hasBanner ? `calc(${HEADER_HEIGHT} + ${TOP_BANNER_HEIGHT})` : HEADER_HEIGHT};
  padding-left: ${ASIDE_WIDTH};

  @media (max-width: ${breakpoint.desktop}) {
    padding-left: 0;
  }
  transition: padding-top 0.3s ease;
`;
