import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("public/fonts/SPOQAHANSANSNEO-BOLD.TTF", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(request: NextRequest) {
  const fontData = await font;

  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          color: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0rem 3rem",
          paddingBottom: "4rem",
          gap: "10px",
          backgroundImage: `url('https://user-images.githubusercontent.com/46296754/238274266-d1db8652-7e85-48f3-85fe-87117272f6bb.png')`,
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <span
            style={{
              color: "rgb(56, 189, 248)",
              fontSize: "30px",
              padding: "0.5rem 1rem",
              backgroundColor: "rgb(35, 39, 47)",
              borderRadius: "10px",
            }}
          >
            한 입 크기로 잘라먹는 타입스크립트
          </span>
        </div>
        <div
          style={{
            color: "white",
            fontSize: "82px",
            width: "800px",
            wordBreak: "keep-all",
          }}
        >
          {title || "공식 핸드북"}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "bold",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
