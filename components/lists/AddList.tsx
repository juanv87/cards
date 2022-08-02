import React, { ChangeEvent, useContext, useState } from "react";
import { ListsContext } from "../../context/lists";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import IconAddCard from "../icons/IconAddCard";
import { listEmojis } from "../emojis";
import { Editor } from "@tinymce/tinymce-react";
import { authContext } from "../../context/authContext";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";

const AddList = () => {
  const { user } = useContext(authContext);

  const { addNewList } = useContext(ListsContext);
  const [titleValue, settitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [statusValue, setStatusValue] = useState("publish");
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [pinnedValue, setPinnedValue] = useState(false);

  const onEmojiClick = (event: ChangeEvent<HTMLSelectElement>) => {
    setChosenEmoji(event.target.value);
  };

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };

  const onDescFieldChanges = (content: any) => {
    setDescValue(content);
  };
  const onSave = async () => {
    if (titleValue.length === 0) return;
    setPinnedValue(false);
    await setDoc(doc(db, "usuarios", user.email, "lists", titleValue), {
      title: titleValue,
      description: descValue,
      titleSlug: titleValue
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      chosenEmoji,
      pinnedValue,
    });
    await addDoc(
      collection(db, "usuarios", user.email, "lists", titleValue, "cards"),
      {
        title: "",
        description: "",
        meaning: "",
        phrase: "",
        list: "",
        fav: "",
        languaje: "",
        slugTitleValue: "",
        imagen: "",
        memoCount: "",
        userId: "",
      }
    );

    setTouched(false);
    settitleValue("");
    setDescValue("");
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
