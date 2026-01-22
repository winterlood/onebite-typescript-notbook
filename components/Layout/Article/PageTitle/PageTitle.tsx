import { useMemo } from "react";
import {
  PageTitleWrapper,
  StyledBanner,
  StyledTitle,
  CouponBanner,
  BannerContent,
  BannerThumbnail,
  BannerTextArea,
  BannerTitle,
  BannerSubtitle,
  BannerCTA,
} from "./PageTitle.style";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";

interface Props {
  recordMap: ExtendedRecordMap;
}

function getDiscountDeadline() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

  const deadline = new Date(today);
  deadline.setDate(today.getDate() + daysUntilSunday);

  return deadline;
}

function formatDeadline(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `~${month}.${day}`;
}

function getDday(deadline: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function PageTitle(props: Props) {
  const { recordMap } = props;

  const { deadlineText, dday } = useMemo(() => {
    const deadline = getDiscountDeadline();
    return {
      deadlineText: formatDeadline(deadline),
      dday: getDday(deadline),
    };
  }, []);

  return (
    <PageTitleWrapper>
      <StyledTitle>{getPageTitle(recordMap)}</StyledTitle>
      <StyledBanner>
        <CouponBanner
          href="https://link.onebitefe.com/r/4zmcqk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BannerContent>
            <BannerThumbnail src="/thumbnail.png" alt="한 입 크기로 잘라먹는 타입스크립트" />
            <BannerTextArea>
              <BannerTitle>온라인 강의 25% 할인 중! {deadlineText} (D-{dday})</BannerTitle>
              <BannerSubtitle>(인프런) 한 입 크기로 잘라먹는 타입스크립트</BannerSubtitle>
            </BannerTextArea>
            <BannerCTA>
              할인 쿠폰 받기
              <span>→</span>
            </BannerCTA>
          </BannerContent>
        </CouponBanner>
      </StyledBanner>
    </PageTitleWrapper>
  );
}
