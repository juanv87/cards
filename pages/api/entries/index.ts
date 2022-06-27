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
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  res.status(200).json(entries);
};
const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    description = "",
    title = "",
    meaning = "",
    status = "finished",
    phrase = "",
  } = req.body;

  const newEntry = new Entry({
    description,
    title,
    meaning,
    phrase,
    createdAt: Date.now(),
    status,
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salió mal, revisar consola del servidor" });
  }
};
