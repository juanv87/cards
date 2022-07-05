import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect } from "../../../database/db";
import { Note, INote } from "../../../models";

type Data =
  | {
      message: string;
    }
  | INote;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El ID no es válido " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateNote(req, res);

    case "GET":
      return getNote(req, res);

    default:
      return res.status(400).json({ message: "El metodo no existe" });
  }
}

const getNote = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const noteToGet = await Note.findById(id);
  await db.disconnect();

  if (!noteToGet) {
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }
  return res.status(200).json(noteToGet);
};

const updateNote = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const noteToUpdate = await Note.findById(id);

  if (!noteToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }

  const {
    description = noteToUpdate.description,
    title = noteToUpdate.title,
    content = noteToUpdate.content,
    list = noteToUpdate.list,
  } = req.body;

  try {
    const updateNote = await Note.findByIdAndUpdate(
      id,
      {
        description,
        title,
        content,
        list,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updateNote!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
