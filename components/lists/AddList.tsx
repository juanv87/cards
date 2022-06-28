import React, { ChangeEvent, useContext, useState } from "react";
import { ListsContext } from "../../context/lists";


const AddList = () => {
  const { addNewList } = useContext(ListsContext);
  const [titleValue, settitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };
  
  const onDescFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setDescValue(event.target.value);
  };
  const onSave = () => {
    if (titleValue.length === 0) return;
    addNewList(titleValue, descValue, "finished");
    setTouched(false);
    settitleValue("");
  };
  return (
    <>
      <input
        value={titleValue}
        type="text"
        placeholder="Title"
        onChange={onTitleFieldChanges}
        className="py-3 px-2 border-solid border-b-2"
      />
      <input
        value={descValue}
        type="text"
        placeholder="Desc"
        onChange={onDescFieldChanges}
        className="py-3 px-2 border-solid border-b-2"
      />

      <button
        className="mt-5 p-2 border-2 border-solid border-lime-600 rounded-md"
        onClick={onSave}
      >
        Guardar
      </button>
    </>
  );
};

export default AddList;
