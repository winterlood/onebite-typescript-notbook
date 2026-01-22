import { useMemo } from "react";
import {
  BannerWrapper,
  BannerContent,
  BannerText,
  BannerHighlight,
  BannerCTA,
  CloseButton,
} from "./TopBanner.style";

interface Props {
  onClose: () => void;
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

export default function TopBanner({ onClose }: Props) {
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const { deadlineText, dday } = useMemo(() => {
    const deadline = getDiscountDeadline();
    return {
      deadlineText: formatDeadline(deadline),
      dday: getDday(deadline),
    };
  }, []);

  return (
    <BannerWrapper>
      <BannerContent
        href="https://link.onebitefe.com/r/4zmcqk"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BannerText>
          <BannerHighlight>25% 할인 {deadlineText} (D-{dday})</BannerHighlight>
          온라인 강의로 수강하기
        </BannerText>
        <BannerCTA>강의 보러가기</BannerCTA>
      </BannerContent>
      <CloseButton onClick={handleClose} aria-label="배너 닫기">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </CloseButton>
    </BannerWrapper>
  );
}
