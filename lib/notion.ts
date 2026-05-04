import { Client as OfficialClient } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { v2 as cloudinary } from "cloudinary";
import { Section } from "types/content";
import { ContentPage } from "types/notion";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

const CLOUDINARY_FOLDER = "ts-handbook";
const CLOUDINARY_CONFIGURED = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (CLOUDINARY_CONFIGURED) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const officalClient = new OfficialClient({
  auth: NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({
  notionClient: officalClient,
  config: { parseChildPages: false },
});

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const richTextToHtml = (
  richText: Array<{ plain_text?: string; href?: string | null }> | undefined
): string => {
  if (!richText?.length) return "";
  return richText
    .map((rt) => {
      const text = escapeHtml(rt.plain_text ?? "");
      if (rt.href) {
        return `<a href="${escapeHtml(rt.href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
      return text;
    })
    .join("");
};

n2m.setCustomTransformer("bookmark", async (block: any) => {
  const url: string = block.bookmark?.url || "";
  if (!url) return "";
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {}
  const caption = richTextToHtml(block.bookmark?.caption);
  return `\n\n<a class="notion-bookmark" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
  <span class="notion-bookmark-host">${escapeHtml(host)}</span>
  <span class="notion-bookmark-url">${escapeHtml(url)}</span>
  ${caption ? `<span class="notion-bookmark-caption">${caption}</span>` : ""}
</a>\n\n`;
});

n2m.setCustomTransformer("callout", async (block: any) => {
  const plainText = (block.callout?.rich_text ?? [])
    .map((rt: { plain_text?: string }) => rt.plain_text ?? "")
    .join("")
    .trim()
    .toLowerCase();
  if (plainText === "table of contents") return "";

  const icon =
    block.callout?.icon?.emoji ||
    (block.callout?.icon?.type === "external"
      ? `<img src="${escapeHtml(block.callout.icon.external.url)}" alt="" />`
      : "💡");
  const content = richTextToHtml(block.callout?.rich_text);
  return `\n\n<div class="notion-callout">
  <span class="notion-callout-icon">${icon}</span>
  <div class="notion-callout-content">${content}</div>
</div>\n\n`;
});

n2m.setCustomTransformer("table_of_contents", async () => "");

n2m.setCustomTransformer("embed", async (block: any) => {
  const url: string = block.embed?.url || "";
  if (!url) return "";
  return `\n\n<div class="notion-embed"><iframe src="${escapeHtml(url)}" loading="lazy" allowfullscreen></iframe></div>\n\n`;
});

n2m.setCustomTransformer("video", async (block: any) => {
  const url: string =
    block.video?.external?.url || block.video?.file?.url || "";
  if (!url) return "";
  if (/youtube\.com|youtu\.be/.test(url)) {
    const idMatch =
      url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || [];
    const id = idMatch[1];
    if (id) {
      return `\n\n<div class="notion-embed notion-video"><iframe src="https://www.youtube.com/embed/${id}" loading="lazy" allowfullscreen></iframe></div>\n\n`;
    }
  }
  return `\n\n<div class="notion-embed notion-video"><video src="${escapeHtml(url)}" controls></video></div>\n\n`;
});

const convertContentPage = (pageObject: PageObjectResponse) => {
  const { id, last_edited_time } = pageObject;
  const res: ContentPage = {
    id,
    last_edited_time,
    section: { index: 0, title: "" },
    chapter: { index: 0, title: "" },
  };

  Object.keys(pageObject.properties).forEach((propertyName) => {
    const property = pageObject.properties[propertyName];
    switch (propertyName) {
      case "section_title": {
        if (property.type === "select") {
          res.section.title = property.select?.name || "";
        }
        break;
      }
      case "section_index": {
        if (property.type === "number") {
          res.section.index = property.number as number;
        }
        break;
      }
      case "chapter_title": {
        if (property.type === "title") {
          res.chapter.title = property.title
            .map((it) => it.plain_text)
            .join(" ") as string;
        }
        break;
      }
      case "chapter_index": {
        if (property.type === "number") {
          res.chapter.index = property.number as number;
        }
        break;
      }
    }
  });

  return res;
};

export const fetchAllPages = async () => {
  try {
    const queryData = await officalClient.databases.query({
      database_id: DATABASE_ID as string,
    });
    const contents = queryData.results.map((pageObject) => {
      return convertContentPage(pageObject as PageObjectResponse);
    });
    return contents;
  } catch (e) {
    throw new Error("");
  }
};

const convertPagesToSections = (pages: ContentPage[]) => {
  const sections: Section[] = [];
  pages.map((page) => {
    let sectionIdx = sections.findIndex(
      (section) => section.index === page.section.index
    );

    if (sectionIdx === -1) {
      sections.push({
        title: page.section.title || "",
        index: page.section.index,
        chapters: [],
      });
      sectionIdx = sections.length - 1;
    }

    sections[sectionIdx].chapters.push({
      id: page.id,
      last_edited_time: page.last_edited_time,
      title: page.chapter.title || "",
      index: page.chapter.index,
      section_title: page.section.title,
      section_index: page.section.index,
    });
  });

  return sections;
};

export const getSections = async () => {
  try {
    const pages = await fetchAllPages();
    if (!pages) {
      throw new Error("get sections error");
    }
    return convertPagesToSections(pages);
  } catch (e) {
    throw new Error("FETCH SECTION ERROR");
  }
};

const extractTitle = (pageObject: PageObjectResponse): string => {
  for (const propertyName of Object.keys(pageObject.properties)) {
    const property = pageObject.properties[propertyName];
    if (property.type === "title") {
      return property.title.map((it) => it.plain_text).join("");
    }
  }
  return "";
};

export interface PageContent {
  pageId: string;
  title: string;
  markdown: string;
}

const toDashedUuid = (id: string): string => {
  const clean = id.replace(/-/g, "");
  if (clean.length !== 32) return id;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(
    12,
    16
  )}-${clean.slice(16, 20)}-${clean.slice(20)}`;
};

const isNotionHostedImage = (url: string): boolean =>
  /(prod-files-secure\.s3|s3[.-]us-west-2\.amazonaws\.com|notion\.so\/image\/|secure\.notion-static\.com|notion-static\.com)/.test(
    url
  );

const clearPageImageFolder = async (pageId: string) => {
  const prefix = `${CLOUDINARY_FOLDER}/${pageId}`;
  try {
    await cloudinary.api.delete_resources_by_prefix(prefix);
    await cloudinary.api.delete_folder(prefix).catch(() => undefined);
  } catch (e) {
    const err = e as { error?: { message?: string }; message?: string };
    console.warn(
      `[cloudinary] clear ${prefix} failed: ${
        err?.error?.message ?? err?.message ?? "unknown"
      }`
    );
  }
};

const uploadImageToCloudinary = async (
  imageUrl: string,
  pageId: string
): Promise<string | null> => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: `${CLOUDINARY_FOLDER}/${pageId}`,
      resource_type: "image",
      overwrite: true,
    });
    return result.secure_url;
  } catch (e) {
    const err = e as { message?: string };
    console.warn(
      `[cloudinary] upload failed for ${imageUrl.slice(0, 80)}…: ${
        err?.message ?? "unknown"
      }`
    );
    return null;
  }
};

const replaceNotionImagesInMarkdown = async (
  markdown: string,
  pageId: string
): Promise<string> => {
  if (!CLOUDINARY_CONFIGURED) return markdown;

  const imageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const matches: Array<{ full: string; alt: string; url: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = imageRegex.exec(markdown)) !== null) {
    if (!isNotionHostedImage(m[2])) continue;
    matches.push({ full: m[0], alt: m[1], url: m[2] });
  }
  if (matches.length === 0) return markdown;

  await clearPageImageFolder(pageId);

  let result = markdown;
  for (const { full, alt, url } of matches) {
    const uploaded = await uploadImageToCloudinary(url, pageId);
    if (!uploaded) continue;
    result = result.split(full).join(`![${alt}](${uploaded})`);
  }
  return result;
};

export const fetchPageContent = async (
  pageID: string
): Promise<PageContent | null> => {
  const normalizedId = toDashedUuid(pageID);

  const summarize = (e: unknown) => {
    const err = e as { code?: string; status?: number; message?: string };
    return `${err?.code ?? "error"}(${err?.status ?? "?"}): ${
      err?.message ?? "unknown"
    }`;
  };

  let title = "";
  try {
    const pageObject = (await officalClient.pages.retrieve({
      page_id: normalizedId,
    })) as PageObjectResponse;
    title = extractTitle(pageObject);
  } catch (e) {
    console.warn(`[notion] retrieve ${normalizedId} → ${summarize(e)}`);
    return null;
  }

  let markdown = "";
  try {
    const mdBlocks = await n2m.pageToMarkdown(normalizedId);
    markdown = n2m.toMarkdownString(mdBlocks).parent || "";
  } catch (e) {
    console.warn(`[notion] toMarkdown ${normalizedId} → ${summarize(e)}`);
  }

  if (markdown) {
    markdown = await replaceNotionImagesInMarkdown(markdown, normalizedId);
  }

  return {
    pageId: normalizedId,
    title,
    markdown,
  };
};
