import type { NextApiRequest, NextApiResponse } from 'next'

import kv from '@/lib/kv'

type ResponseData = {
  views?: number,
  message?: string
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') return res.status(400).json({ message: 'You must provide a slug' });

  if (req.method === 'GET') {
    await get(slug, res);
    return;
  }

  if (req.method === 'POST') {
    await incr(slug, req, res);
    return;
  }

}


export async function incr(slug: string, req: NextApiRequest, res: NextApiResponse<ResponseData>) {

  const forwarded = req.headers["x-forwarded-for"]
  const ip = forwarded ? forwarded.toString().split(/, /)[0] : req.socket.remoteAddress

  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );

    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each slug
    const isNew = await kv.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 1 * 60 * 60, // 1 hour
    });

    if (!isNew) return res.status(202).end();
  }

  const views = await kv.incr(["pageviews", "projects", slug].join(":"));
  return res.status(200).json({ views: views });
}

export async function get(slug: string, res: NextApiResponse<ResponseData>) {
  const views: number = await kv.get(["pageviews", "projects", slug].join(":")) || 0;
  return res.status(200).json({ views: views });
}