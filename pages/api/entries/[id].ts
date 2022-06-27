import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect } from "../../../database/db";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El ID no es válido " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: "El metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }

  const {
    description = entryToUpdate.description,
    title = entryToUpdate.title,
    meaning = entryToUpdate.meaning,
    phrase = entryToUpdate.phrase,
    status = entryToUpdate.status,
  } = req.body;

  const updateEntry = await Entry.findByIdAndUpdate(
    id,
    {
      description,
      title,
      meaning,
      phrase,
      status,
    },
    { runValidators: true, new: true }
  );
  res.status(200).json(updateEntry!);
};
