import styled from "@emotion/styled";

export const StyledLogo = styled("div")`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-family: bold;
  padding: 0.5rem 0rem;
  border-radius: 20px;
  color: var(--fg-color);
  font-size: var(--font-small);

  svg {
    width: 22px;
    height: 22px;
    fill: var(--fg-color);
    background-color: none;
  }
`;
