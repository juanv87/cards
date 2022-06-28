import React from "react";
import { List } from "../../interfaces";
interface Props {
  list: List;
}
const SingleList = ({ list }: Props) => {
  console.log("list", list);

  const { title, description, status } = list;
  return (
    <div className="bg-gray-300 p-5 rounded-lg relative">
      <h3 className="text-2xl">{title}</h3>
      <p className="text-base italic">{description}</p>
      <hr className="my-2 border-gray-400" />
      <p className="hidden">{status}</p>
    </div>
  );
};
export default SingleList;
