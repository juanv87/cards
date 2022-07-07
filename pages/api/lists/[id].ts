import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect } from "../../../database/db";
import { List, IList } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IList;

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
      return updateList(req, res);

    case "GET":
      return getList(req, res);

    default:
      return res.status(400).json({ message: "El metodo no existe" });
  }
}

const getList = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const listToGet = await List.findById(id);
  await db.disconnect();

  if (!listToGet) {
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }
  return res.status(200).json(listToGet);
};

const updateList = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const listToUpdate = await List.findById(id);

  if (!listToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }

  const {
    description = listToUpdate.description,
    title = listToUpdate.title,
    status = listToUpdate.status,
    slugTitleValue = listToUpdate.slugTitleValue,
    chosenEmoji = listToUpdate.chosenEmoji,
    pinned = listToUpdate.pinned,
  } = req.body;

  try {
    const updateList = await List.findByIdAndUpdate(
      id,
      {
        description,
        title,
        slugTitleValue,
        status,
        chosenEmoji,
        pinned,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updateList!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
