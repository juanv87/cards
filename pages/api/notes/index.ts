import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect, disconnect } from "../../../database/db";
import { Note, INote } from "../../../models";

type Data =
  | {
      message: string;
    }
  | INote[]
  | INote;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Voy a tener 2 endopints: 1 para crear y otro para recibir
  switch (req.method) {
    case "GET":
      return getNotes(res);

    case "POST":
      return postNote(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getNotes = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const notes = await Note.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  res.status(200).json(notes);
};
const postNote = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "", title = "", content = "", list = "" } = req.body;

  const newNote = new Note({
    description,
    title,
    createdAt: Date.now(),
    content,
    list,
  });

  try {
    await db.connect();
    await newNote.save();
    await db.disconnect();

    return res.status(201).json(newNote);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salió mal, revisar consola del servidor" });
  }
};
