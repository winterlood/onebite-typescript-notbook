import {
  PageTitleWrapper,
  StyledBanner,
  StyledTitle,
  StyledA,
  StyledSpan,
  StyledAlert,
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
          <StyledSpan>이 페이지는 인프런 강의</StyledSpan>&nbsp;
          <StyledLink href={``}>한 입 크기로 잘라먹는 타입스크립트</StyledLink>
          &nbsp;
          <StyledSpan>의 강의 자료입니다</StyledSpan>
        </StyledAlert>
      </StyledBanner>
    </PageTitleWrapper>
  );
}
