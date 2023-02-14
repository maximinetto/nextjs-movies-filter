import { unexpectedMessage } from "@/errors/messages/unexpected";
import NotFoundError from "@/errors/NotFoundError";
import getMoviesService from "@/services/server/getMovies";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { search = "" } = req.query as { search: string };
  try {
    const movies = await getMoviesService({ search });
    res.json({
      ok: true,
      data: movies,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        ok: false,
        error: error.message,
      });
    }

    res.status(500).json({
      ok: false,
      error: unexpectedMessage,
    });
  }
};

export default handler;
