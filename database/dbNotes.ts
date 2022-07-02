import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Entry, INote, Note } from "../models";

export const getNoteById = async (id: string): Promise<INote | null> => {
  if (!isValidObjectId(id)) return null;
  await db.connect();
  const note = await Note.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(note));
};

export const getEntriesByNote = async (id: string): Promise<INote | null> => {
  if (!isValidObjectId(id)) return null;
  await db.connect();
  const note = await Note.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(note));
};
