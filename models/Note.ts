import mongoose, { Model, Schema } from "mongoose";
import { Note } from "../interfaces";

export interface INote extends Note {}

const noteSchema = new Schema({
  title: { type: String },
  content: { type: String },
  createdAt: { type: Number },
  description: { type: String },
});

const NoteModel: Model<INote> =
  mongoose.models.Note || mongoose.model("Note", noteSchema);

export default NoteModel;
