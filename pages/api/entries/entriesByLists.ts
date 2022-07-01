import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect, disconnect } from "../../../database/db";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Voy a tener 2 endopints: 1 para crear y otro para recibir
  switch (req.method) {
    case "GET":
      return getEntriesByLists(res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntriesByLists = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find({ list: "Phrasal verbs" });
  await db.disconnect();
  res.status(200).json(entries);
};
