import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect, disconnect } from "../../../database/db";
import { List, IList } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IList[]
  | IList;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Voy a tener 2 endopints: 1 para crear y otro para recibir
  switch (req.method) {
    case "GET":
      return getLists(res);

    case "POST":
      return postList(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getLists = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const lists = await List.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  res.status(200).json(lists);
};
const postList = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    description = "",
    title = "",
    status = "finished",
    slugTitleValue,
    chosenEmoji,
    pinned = false,
  } = req.body;

  const newList = new List({
    description,
    title,
    createdAt: Date.now(),
    status,
    slugTitleValue,
    chosenEmoji,
    pinned,
  });

  try {
    await db.connect();
    await newList.save();
    await db.disconnect();

    return res.status(201).json(newList);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salió mal, revisar consola del servidor" });
  }
};
