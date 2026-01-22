import styled from "@emotion/styled";
import { TOP_BANNER_HEIGHT } from "lib/layout";

export const BannerWrapper = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${TOP_BANNER_HEIGHT};
  background: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 0 3rem 0 1rem;
`;

export const BannerContent = styled("a")`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #ffffff;
  font-size: 0.9rem;
  font-family: medium;

  &:hover {
    opacity: 0.95;
  }

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

export const BannerText = styled("span")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e2e8f0;

  @media (max-width: 640px) {
    font-size: 0.75rem;
    gap: 0.35rem;
  }
`;

export const BannerHighlight = styled("span")`
  font-family: bold;
  color: #fbbf24;

  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

export const BannerCTA = styled("span")`
  background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%);
  color: #0f172a;
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
  font-family: bold;
  font-size: 0.8rem;
  white-space: nowrap;

  @media (max-width: 640px) {
    padding: 0.25rem 0.6rem;
    font-size: 0.7rem;
  }
`;

export const CloseButton = styled("button")`
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 640px) {
    right: 0.5rem;
    padding: 0.25rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;
