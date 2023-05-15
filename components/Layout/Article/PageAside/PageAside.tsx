import Image from "next/image";
import { PageAsideWrapper } from "./PageAside.style";
import thumbnail from "public/thumbnail.png";
import Link from "next/link";
import config from "config/config.json";

export default function PageAside() {
  return (
    <PageAsideWrapper>
      {/* 여기에 배너를 넣으면 됩니다 */}
      <Link href={`/${config.homePageID}`}>
        {/* <Image alt={"thumb"} src={thumbnail} width={220} /> */}
      </Link>
    </PageAsideWrapper>
  );
}
