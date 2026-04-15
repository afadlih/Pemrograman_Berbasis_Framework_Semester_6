// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataByID, retrieveProducts } from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const rawSegments = req.query.produk;
    const segments = Array.isArray(rawSegments)
      ? rawSegments
      : typeof rawSegments === "string"
        ? [rawSegments]
        : [];

    // /api or /api/
    if (segments.length === 0) {
      res.status(200).json({
        status: true,
        status_code: 200,
        data: {
          message: "API aktif. Gunakan /api/produk atau /api/produk/:id",
        },
      });
      return;
    }

    // /api/produk
    if (segments.length === 1 && segments[0] === "produk") {
      const data = await retrieveProducts("products");
      res.status(200).json({
        status: true,
        status_code: 200,
        data,
      });
      return;
    }

    // /api/produk/:id
    if (segments.length >= 2 && segments[0] === "produk") {
      const data = await retrieveDataByID("products", segments[1]);
      if (!data) {
        res.status(404).json({
          status: false,
          status_code: 404,
          data: { message: "Produk tidak ditemukan" },
        });
        return;
      }

      res.status(200).json({
        status: true,
        status_code: 200,
        data,
      });
      return;
    }

    res.status(404).json({
      status: false,
      status_code: 404,
      data: { message: "Endpoint tidak ditemukan" },
    });
  } catch {
    res.status(500).json({
      status: false,
      status_code: 500,
      data: { message: "Terjadi kesalahan server" },
    });
  }
}
