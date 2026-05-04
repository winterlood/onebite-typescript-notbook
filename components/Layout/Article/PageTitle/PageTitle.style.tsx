import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import Link from "next/link";

export const PageTitleWrapper = styled("div")`
  padding-top: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--bg-opacity-color);
`;

export const StyledTitle = styled("h1")`
  font-family: bold;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin: 0;
  letter-spacing: -0.01em;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const StyledBanner = styled("div")`
  padding-top: 1.5rem;
  font-size: var(--font);
`;

export const CouponBanner = styled("a")`
  display: block;
  text-decoration: none;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: var(--notion-max-width, 720px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  }
`;

export const BannerContent = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.75rem;

  @media (min-width: 600px) {
    flex-direction: row;
    padding: 0.875rem 1.25rem;
    gap: 1rem;
  }
`;

export const BannerThumbnail = styled("img")`
  width: 80px;
  height: auto;
  border-radius: 6px;
  flex-shrink: 0;

  @media (min-width: 600px) {
    width: 90px;
  }
`;

export const BannerTextArea = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: center;

  @media (min-width: 600px) {
    text-align: left;
    flex: 1;
  }
`;

export const BannerTitle = styled("div")`
  color: #ffffff;
  font-family: bold;
  font-size: 1rem;
  line-height: 1.4;

  @media (min-width: 600px) {
    font-size: 1.1rem;
  }
`;

export const BannerSubtitle = styled("div")`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-family: medium;
`;

export const BannerCTA = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #38bdf8;
  color: #0c4a6e;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-family: bold;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  @media (min-width: 600px) {
    margin-left: auto;
    flex-shrink: 0;
  }

  &:hover {
    background: #7dd3fc;
  }
`;

export const StyledSpan = styled("span")``;
export const StyledBoldSpan = styled("span")`
  font-family: bold;
`;

export const StyledLink = styled(Link)`
  color: var(--primary-color);
  font-family: bold;
  text-decoration: none;
`;

export const StyledA = styled("a")`
  color: var(--primary-color);
  font-family: bold;
`;

export const StyledAlert = styled(Alert)`
  background-color: var(--primary-tinted-color);
  color: var(--fg-color);
  font-size: var(--font-small);
  font-family: medium;
  svg {
    color: var(--primary-color);
  }
`;
