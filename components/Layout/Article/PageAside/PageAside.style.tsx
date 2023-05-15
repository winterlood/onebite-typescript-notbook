import styled from "@emotion/styled";

export const PageAsideWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 220px;

  img {
    margin: 2rem 0rem;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const Description = styled("span")`
  padding: 0.5rem;
  color: var(--fg-opacity-color);
  font-family: medium;
  font-size: var(--font-small);
`;
