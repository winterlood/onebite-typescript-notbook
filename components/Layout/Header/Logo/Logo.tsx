import { StyledLogo } from "./Logo.style";
import config from "config/config.json";
import LogoSvg from "public/logo.svg";
import { useRouter } from "next/router";

export default function Logo() {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <StyledLogo onClick={onClick}>
      <LogoSvg />
      {config.site}
    </StyledLogo>
  );
}
