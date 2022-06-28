import React, { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";

const AddCard = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const [titleValue, settitleValue] = useState("");
  const [meaningValue, setMeaningValue] = useState("");
  const [phraseValue, setPhraseValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [listValue, setListValue] = useState("");

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };
  const onMeaningFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setMeaningValue(event.target.value);
  };
  const onPhraseFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setPhraseValue(event.target.value);
  };
  const onDescFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setDescValue(event.target.value);
  };
  const onListFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setListValue(event.target.value);
  };
  const onSave = () => {
    if (titleValue.length === 0) return;
    addNewEntry(titleValue, meaningValue, phraseValue, descValue, "finished", listValue);
    settitleValue("");
    setMeaningValue("");
    setPhraseValue("");
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
        value={meaningValue}
        type="text"
        placeholder="Meaning"
        onChange={onMeaningFieldChanges}
        className="py-3 px-2 border-solid border-b-2"
      />
      <input
        value={phraseValue}
        type="text"
        placeholder="Phrase"
        onChange={onPhraseFieldChanges}
        className="py-3 px-2 border-solid border-b-2"
      />
      <input
        value={descValue}
        type="text"
        placeholder="Desc"
        onChange={onDescFieldChanges}
        className="py-3 px-2 border-solid border-b-2"
      />
      <input
        value={listValue}
        type="text"
        placeholder="List"
        onChange={onListFieldChanges}
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

export default AddCard;
