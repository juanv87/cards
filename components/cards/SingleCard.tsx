import React, { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { Entry } from "../../interfaces";
interface Props {
  entry: Entry;
}
const SingleCard = ({ entry }: Props) => {
  const [titleEdit, setTitleEdit] = useState(false);

  const [titleValue, settitleValue] = useState("");
  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };

  const { title, meaning, phrase, description, status, type } = entry;
  const { updateEntry } = useContext(EntriesContext);
  const newEntry = {
    ...entry,
    title: titleValue,
  };

  const onUpdate = () => {
    updateEntry(newEntry);
  };

  const onTitleEdit = () => {
    setTitleEdit(true);
  };

  return (
    <>
      <div className="bg-gray-300 p-5 rounded-lg relative">
        <div className="cardTitle relative">
          <h3 className="text-2xl">{title} <button className="ml-5 text-sm" onClick={onTitleEdit}>edit</button></h3>
          {titleEdit && (
            <input
              value={titleValue}
              type="text"
              placeholder={title}
              onChange={onTitleFieldChanges}
              className="py-1 px-1 border-solid border-b-2 absolute top-0 bg-gray-300 border-none focus-visible:outline-none focus:border-none"
            />
          )}
        </div>
        <p className="italic blur-sm hover:blur-0 cursor-default transition-all absolute top-5 right-5">{`(${meaning})`}</p>
        <p className="text-base italic">{description}</p>
        <hr className="my-2 border-gray-400" />
        <p className="text-base italic">
          <span className="text-xs">Example:</span> <br /> {phrase}
        </p>
        <p className="hidden">{status}</p>
        <p className="hidden">{type}</p>
      </div>
      <button onClick={onUpdate}>Actualizar</button>
    </>
  );
};
export default SingleCard;
