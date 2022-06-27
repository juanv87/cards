import React from "react";
import { Entry } from "../../interfaces";
interface Props {
  entry: Entry;
}
const SingleCard = ({ entry }: Props) => {
  console.log("entry", entry);

  const { title, meaning, phrase, description, status } = entry;
  return (
    <div className="bg-gray-300 p-5 rounded-lg relative">
      <h3 className="text-2xl">{title}</h3>
      <p className="italic blur-sm hover:blur-0 cursor-default transition-all absolute top-5 right-5">{`(${meaning})`}</p>
      <p className="text-base italic">{description}</p>
      <hr className="my-2 border-gray-400" />
      <p className="text-base italic">
        <span className="text-xs">Example:</span> <br /> {phrase}
      </p>
      <p className="hidden">{status}</p>
    </div>
  );
};
export default SingleCard;
