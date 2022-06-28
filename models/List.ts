import mongoose, { Model, Schema } from "mongoose";
import { List } from "../interfaces";

export interface IList extends List {}

const listSchema = new Schema({
  description: { type: String },
  title: { type: String },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado permitido",
    },
    default: "finished",
  },
});

const ListModel: Model<IList> =
  mongoose.models.List || mongoose.model("List", listSchema);

export default ListModel;
