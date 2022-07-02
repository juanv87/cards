import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Entry, IList, List } from "../models";

export const getListById = async (id: string): Promise<IList | null> => {
  if (!isValidObjectId(id)) return null;
  await db.connect();
  const list = await List.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(list));
};

export const getEntriesByList = async (id: string): Promise<IList | null> => {
  if (!isValidObjectId(id)) return null;
  await db.connect();
  const list = await List.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(list));
};
