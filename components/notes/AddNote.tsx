import React, { ChangeEvent, useContext, useState } from "react";
import { NotesContext } from "../../context/notes";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import IconAddCard from "../icons/IconAddCard";
import { Editor } from "@tinymce/tinymce-react";

const AddNote = () => {
  const { addNewNote } = useContext(NotesContext);
  const [titleValue, settitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");

  const onEmojiClick = (event: ChangeEvent<HTMLSelectElement>) => {
    setChosenEmoji(event.target.value);
  };

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };

  const onDescFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setDescValue(event.target.value);
  };
  const onContentFieldChanges = (content: any) => {
    setContentValue(content);
  };
  const onSave = () => {
    if (titleValue.length === 0) return;
    addNewNote(titleValue, descValue, contentValue);
    setTouched(false);
    settitleValue("");
    setDescValue("");
    setContentValue("");
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
            value={descValue}
            type="text"
            placeholder="Description"
            onChange={onDescFieldChanges}
            className="py-3 px-2 border-none mb-2"
          />
          <Editor
            apiKey="urxgaopom4tpzlamq09oxy8hyu0hxifvc57jc0esxnsnbm0y"
            value={contentValue}
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
            onEditorChange={onContentFieldChanges}
          />

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
        <div className="preview min-w-min w-1/3 ml-10">
          <div className="bg-white border-t-8 shadow-xl border-gray-200 p-5 rounded-lg relative">
            <h3 className="text-2xl">{titleValue || "Title"}</h3>
            <p className="my-2">{descValue || "Description"}</p>
            <div
              className="max-h-40 text-base pb-5 text-gray-800 max-w-full pr-5"
              dangerouslySetInnerHTML={{
                __html: contentValue || "Content",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
