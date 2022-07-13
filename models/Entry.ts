import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  title: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished", "publish"],
      message: "{VALUE} no es un estado permitido",
    },
    default: "publish",
  },
  meaning: { type: String },
  phrase: { type: String },
  createdAt: { type: Number },
  list: { type: String },
  fav: { type: Boolean },
  languaje: { type: String },
  titleValue: { type: String },
  imagen: { type: String },
  memoCount: { type: Number, default: 0 },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
