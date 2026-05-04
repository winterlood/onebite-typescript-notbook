import type { NextApiRequest, NextApiResponse } from "next";
import config from "config/config.json";
import { fetchAllPages } from "lib/notion";

type RevalidateBody = {
  secret?: string;
  path?: string;
};

type RevalidateResponse =
  | { revalidated: true; paths: string[] }
  | { revalidated: false; message: string; failures?: Array<{ path: string; error: string }> };

const getSecret = (req: NextApiRequest): string | undefined => {
  const headerAuth = req.headers.authorization;
  if (headerAuth?.startsWith("Bearer ")) return headerAuth.slice(7);
  if (typeof req.headers["x-revalidate-secret"] === "string") {
    return req.headers["x-revalidate-secret"];
  }
  if (typeof req.query.secret === "string") return req.query.secret;
  if (req.body && typeof (req.body as RevalidateBody).secret === "string") {
    return (req.body as RevalidateBody).secret;
  }
  return undefined;
};

const getTargetPath = (req: NextApiRequest): string | undefined => {
  if (typeof req.query.path === "string") return req.query.path;
  if (req.body && typeof (req.body as RevalidateBody).path === "string") {
    return (req.body as RevalidateBody).path;
  }
  return undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevalidateResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      revalidated: false,
      message: "Method not allowed. Use POST.",
    });
  }

  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return res.status(500).json({
      revalidated: false,
      message: "Server misconfigured: REVALIDATE_SECRET is not set.",
    });
  }

  const provided = getSecret(req);
  if (provided !== expected) {
    return res
      .status(401)
      .json({ revalidated: false, message: "Invalid secret." });
  }

  const targetPath = getTargetPath(req);

  // single-path revalidation
  if (targetPath) {
    const normalized = targetPath.startsWith("/") ? targetPath : `/${targetPath}`;
    try {
      await res.revalidate(normalized);
      return res.status(200).json({ revalidated: true, paths: [normalized] });
    } catch (e) {
      const err = e as { message?: string };
      return res.status(500).json({
        revalidated: false,
        message: `Revalidate failed for ${normalized}: ${err?.message ?? "unknown"}`,
      });
    }
  }

  // full revalidation: root + every chapter page
  let pages: { id: string }[] = [];
  try {
    pages = await fetchAllPages();
  } catch (e) {
    const err = e as { message?: string };
    return res.status(500).json({
      revalidated: false,
      message: `Failed to fetch page list: ${err?.message ?? "unknown"}`,
    });
  }

  const paths = [`/`, `/${config.homePageID}`, ...pages.map((p) => `/${p.id}`)];
  const succeeded: string[] = [];
  const failures: Array<{ path: string; error: string }> = [];

  for (const p of paths) {
    try {
      await res.revalidate(p);
      succeeded.push(p);
    } catch (e) {
      const err = e as { message?: string };
      failures.push({ path: p, error: err?.message ?? "unknown" });
    }
  }

  if (failures.length > 0) {
    return res.status(207).json({
      revalidated: false,
      message: `Partial success: ${succeeded.length}/${paths.length} paths revalidated.`,
      failures,
    });
  }

  return res.status(200).json({ revalidated: true, paths: succeeded });
}
