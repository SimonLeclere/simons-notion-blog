import { NextApiRequest, NextApiResponse } from "next";
import { unfurl } from "unfurl.js";

// const CACHE_RESULT_SECONDS = 60 * 60; // 1 hour

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url;

  // a bit of validation...
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "A valid URL string is required" });
  }

  return unfurl(url)
    .then((unfurlResponse) => {
        return res
            // .setHeader("Cache-Control", `public, max-age=${CACHE_RESULT_SECONDS}`)
            .json({
                title: unfurlResponse.title ?? null,
                description: unfurlResponse.description || unfurlResponse.open_graph.description || null,
                favicon: unfurlResponse.favicon ?? null,
                imageSrc: unfurlResponse.open_graph?.images?.[0]?.url ?? null,
            });
    })
    .catch((error) => {
      if (error?.code === "ENOTFOUND") {
        return res.status(404).json({ error: "Not found" });
      }
      console.error(error);
      throw new Error(error);
    });
}
