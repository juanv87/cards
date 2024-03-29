import React, { ChangeEvent, useContext, useState } from "react";
import { ListsContext } from "../../context/lists";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import IconAddCard from "../icons/IconAddCard";
import { listEmojis } from "../emojis";
import { Editor } from "@tinymce/tinymce-react";
import { authContext } from "../../context/authContext";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../lib/firebase/firebase";
import setNewList from "../../services/setNewList";

const AddList = () => {
  const { user } = useContext(authContext);

  const [titleValue, settitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [pinnedValue, setPinnedValue] = useState(false);

  const [loadingNewList, setLoadingNewList] = useState(false);

  const onEmojiClick = (event: ChangeEvent<HTMLSelectElement>) => {
    setChosenEmoji(event.target.value);
  };

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };

  const onDescFieldChanges = (content: any) => {
    setDescValue(content);
  };

  // Todo: Pasar funcion a context
  const onSave = async () => {
    if (titleValue.length === 0) return;
    setLoadingNewList(true);
    setPinnedValue(false);
    await setNewList({
      titleValue,
      userId: user.email.split("@")[0],
      descValue,
      chosenEmoji,
      pinnedValue,
    });
    setLoadingNewList(false);
    settitleValue("");
    setDescValue("");
  };
  return (
    <>
      <div className="flex">
        <div className="grid gap-2 w-1/2 mt-5 relative">
          {loadingNewList && (
            <div className="absolute top-0 left-0 w-full h-full opacity-75 animate-pulse bg-white z-50 flex justify-center items-center">
              Cargando...
            </div>
          )}
          <input
            value={titleValue}
            type="text"
            placeholder="Title"
            onChange={onTitleFieldChanges}
            className="py-3 px-2 border-none mb-2"
          />

          <Editor
            apiKey="urxgaopom4tpzlamq09oxy8hyu0hxifvc57jc0esxnsnbm0y"
            value={descValue}
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
            onEditorChange={onDescFieldChanges}
          />
          <select
            className="px-4 py-3 cursor-pointer"
            onChange={onEmojiClick}
            name="lists"
            id=""
          >
            {listEmojis.map(({ title, id }) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </select>
          {/* <div>
            {chosenEmoji ? (
              <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
              <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} /> 
          </div>*/}
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
            <div className="flex items-center mb-5 gap-2">
              <span role="img" aria-label="dog" className="text-3xl">
                {chosenEmoji}
              </span>
              <h3 className="text-2xl">{titleValue || "Title"}</h3>
            </div>
            <div
              className="max-h-40 text-base pb-5 text-gray-800 max-w-full pr-5"
              dangerouslySetInnerHTML={{
                __html: descValue || "Description",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddList;
