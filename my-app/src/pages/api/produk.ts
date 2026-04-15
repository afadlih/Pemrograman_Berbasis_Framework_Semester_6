// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../../utils/db/servicefirebase";

interface Product {
  [key: string]: string | number | boolean | null;
}

type Data = {
  status: boolean;
  status_code: number;
  data: Product[];
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const data = await retrieveProducts("products");

  res.status(200).json({
    status: true,
    status_code: 200,
    data,
  });
}