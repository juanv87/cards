import React, { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { ListsContext } from "../../context/lists";
import { Editor } from "@tinymce/tinymce-react";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import IconAddCard from "../icons/IconAddCard";
interface Props {
  currentList?: string;
}

const AddCard = ({ currentList }: Props) => {
  const { addNewEntry } = useContext(EntriesContext);
  const [titleValue, settitleValue] = useState("");
  const [meaningValue, setMeaningValue] = useState("");
  const [phraseValue, setPhraseValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [listValue, setListValue] = useState(currentList || "");
  const [languajeValue, setLanguajeValue] = useState("");
  const [favValue, setFavValue] = useState(false);
  const [statusValue, setStatusValue] = useState("publish");

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };
  const onMeaningFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setMeaningValue(event.target.value);
  };
  const onPhraseFieldChanges = (content: any) => {
    setPhraseValue(content);
  };
  const onDescFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setDescValue(event.target.value);
  };
  const onListFieldChanges = (event: ChangeEvent<HTMLSelectElement>) => {
    setListValue(event.target.value);
  };
  const onLanguajeFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setLanguajeValue(event.target.value);
  };

  const { lists } = useContext(ListsContext);

  const onSave = () => {
    if (titleValue.length === 0) return;
    addNewEntry(
      titleValue,
      descValue,
      statusValue,
      meaningValue,
      phraseValue,
      currentList ||
        listValue
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      favValue,
      languajeValue,
      titleValue
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    );
    settitleValue("");
    setMeaningValue("");
    setPhraseValue("");
    setDescValue("");
    setListValue("");
    setLanguajeValue("");
  };
  return (
    <>
      <div className="flex">
        <div className="grid gap-2 w-1/2 mt-5">
          <input
            value={titleValue}
            type="text"
            placeholder="Title"
            onChange={onTitleFieldChanges}
            className="py-3 px-2 border-none mb-2"
          />
          <input
            value={meaningValue}
            type="text"
            placeholder="Meaning"
            onChange={onMeaningFieldChanges}
            className="py-3 px-2 border-none mb-2"
          />
          <input
            value={descValue}
            type="text"
            placeholder="Desc"
            onChange={onDescFieldChanges}
            className="py-3 px-2 border-none mb-2"
          />
          <Editor
            apiKey="urxgaopom4tpzlamq09oxy8hyu0hxifvc57jc0esxnsnbm0y"
            value={phraseValue}
            init={{
              height: 200,
              menubar: false,
              icons: "thin",
              skin: "naked",
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen textcolor ",
                "insertdatetime media table paste code help wordcount",
              ],
            }}
            onEditorChange={onPhraseFieldChanges}
          />

          {currentList ? (
            ""
          ) : (
            <select
              className="px-4 py-3 cursor-pointer"
              onChange={onListFieldChanges}
              name="lists"
              id=""
            >
              {lists.map(({ _id, title, chosenEmoji }) => (
                <option key={_id} value={title}>
                  {chosenEmoji} {title}
                </option>
              ))}
            </select>
          )}
          <div className="flex justify-end">
            <ContainerBtnSave>
              <button
                onClick={onSave}
                className="flex items-center gap-1 cursor-default"
              >
                <IconAddCard size={28} color="white" />
                Guardar
              </button>
            </ContainerBtnSave>
          </div>
        </div>
        <div className="preview mt-5 min-w-min w-1/3 ml-10">
          <div className="bg-white border-t-8 shadow-xl border-gray-200 p-5 rounded-lg relative">
            <h3 className="text-2xl">{titleValue || "Title"}</h3>
            <p>{meaningValue || "Meaning"}</p>
            <p className="text-base italic cursor-default transition-all">
              {descValue || "Description"}
            </p>
            <hr className="my-2 border-gray-400" />
            <span className="italic text-xs">Example:</span> <br />
            <div
              className="text-base text-gray-800 content float-left nota-content"
              dangerouslySetInnerHTML={{
                __html: phraseValue || "Phrase in context",
              }}
            />{" "}
            <br />
            <p className="mt-5">List: {listValue || "___"}</p>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCard;
