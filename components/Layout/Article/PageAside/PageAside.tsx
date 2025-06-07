import Image from "next/image";
import { PageAsideWrapper } from "./PageAside.style";
import thumbnail from "public/thumbnail.png";
import CouponImg from "public/coupon.png";
import Link from "next/link";
import config from "config/config.json";

export default function PageAside() {
  return (
    <PageAsideWrapper>
      {/* <Link href={`/a1cada6f7b5a4628a11b1d4e33aef004`}>
        <Image
          alt={"coupong"}
          src={CouponImg}
          width={220}
          placeholder="blur"
          blurDataURL={CouponImg.blurDataURL}
        />
      </Link> */}
    </PageAsideWrapper>
  );
}
