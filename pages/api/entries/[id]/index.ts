import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: "El metodo no existe" });
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToDelete = await Entry.remove({ _id: id });
  await db.disconnect();
  if (!entryToDelete) {
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }
  return res.status(200).json(entryToDelete);
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryToGet = await Entry.findById(id);
  await db.disconnect();

  if (!entryToGet) {
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }
  return res.status(200).json(entryToGet);
};

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
    list = entryToUpdate.list,
    imagen = entryToUpdate.imagen,
    memoCount = entryToUpdate.memoCount,
    userId = entryToUpdate.userId,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        title,
        meaning,
        phrase,
        status,
        list,
        imagen,
        memoCount,
        userId,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updateEntry!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
