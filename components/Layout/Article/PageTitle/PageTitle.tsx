import {
  PageTitleWrapper,
  StyledBanner,
  StyledTitle,
  StyledA,
  StyledSpan,
  StyledAlert,
  StyledBoldSpan,
} from "./PageTitle.style";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import { StyledLink } from "./PageTitle.style";
import { PageContext } from "../../../../pages/[[...slug]]";

interface Props {
  recordMap: ExtendedRecordMap;
}

export default function PageTitle(props: Props) {
  const { recordMap } = props;

  return (
    <PageTitleWrapper>
      <StyledTitle>{getPageTitle(recordMap)}</StyledTitle>
      <StyledBanner>
        <StyledAlert>
          <StyledBoldSpan>한 입 크기로 잘라먹는 타입스크립트</StyledBoldSpan>
          &nbsp;
          <StyledSpan>의 강의 자료입니다</StyledSpan>
          <br />
          <StyledLink href={`https://link.onebitefe.com/r/5mdrl3`}>
            10% 할인 쿠폰 받기 (~2025.12)
          </StyledLink>
        </StyledAlert>
      </StyledBanner>
    </PageTitleWrapper>
  );
}
