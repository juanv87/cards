/* eslint-disable @next/next/no-img-element */
import { Editor } from "@tinymce/tinymce-react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useState,
} from "react";
import { authContext } from "../../context/authContext";
import { EntriesContext } from "../../context/entries";
import { ListsContext } from "../../context/lists";
import { Entry } from "../../interfaces";
import { db } from "../../lib/firebase/firebase";
import setNewCard from "../../services/setNewCard";
import updateCard from "../../services/updateCard";
import Definitions from "../Definitions";
import useGetLists from "../hooks/useGetLists";
import IconBtnSave from "../icons/IconBtnSave";
import IconDelete from "../icons/IconDelete";
import IconEdit from "../icons/IconEdit";
import IconTag from "../icons/IconTag";
import { ContainerBtnCancel } from "../layouts/ContainerBtnCancel";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import { ContainerBtnViewMore } from "../layouts/ContainerBtnViewMore";
import { ContainerCard } from "../layouts/ContainerCard";

interface Props {
  entry: Entry;
}
const SingleCard = ({ entry }: Props) => {
  const { user } = useContext(authContext);
  const userName = user && user.email.split("@")[0];

  const {
    title,
    meaning,
    phrase,
    description,
    status,
    list,
    fav,
    languaje,
    id,
    memoCount,
    imagen,
    slugTitleValue,
    userId,
  } = entry;

  const [entryEdit, setEntryEdit] = useState(false);
  const [titleValue, settitleValue] = useState(title);
  const [descValue, setDescValue] = useState(description);
  const [phraseValue, setPhraseValue] = useState(phrase);
  const [meaningValue, setMeaningValue] = useState(meaning);
  const [listValue, setListValue] = useState(list);
  const [viewDefinitions, setViewDefinitions] = useState(false);
  const [imagenValue, setImagenValue] = useState(imagen);
  const [isLoadingCard, setIsLoadingCard] = useState(false);
  const [cardExists, setCardExists] = useState(true);

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    settitleValue(event.target.value);
  };
  const onDescFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setDescValue(event.target.value);
  };
  const onPhraseFieldChanges = (content: any) => {
    setPhraseValue(content);
  };
  const onMeaningFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setMeaningValue(event.target.value);
  };
  const onListFieldChanges = (event: ChangeEvent<HTMLSelectElement>) => {
    setListValue(event.target.value);
  };
  const onImagenFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setImagenValue(event.target.value);
  };

  // const { updateEntry, deleteEntry, deleteCard } = useContext(EntriesContext);
  // const newEntryUpdate = {
  //   ...entry,
  //   title: titleValue !== "" ? titleValue : title,
  //   description: descValue !== "" ? descValue : description,
  //   phrase: phraseValue !== "" ? phraseValue : phrase,
  //   meaning: meaningValue !== "" ? meaningValue : meaning,
  //   list: listValue !== "" ? listValue : list,
  //   imagen: imagenValue || imagen,
  //   user: user?.uid,
  // };

  const onUpdate = async () => {
    setIsLoadingCard(true);
    await updateCard({
      idCard: title,
      idList: list,
      titleValue: titleValue || title,
      userId: user.email.split("@")[0],
      descValue: descValue || description,
      listValue: listValue || list,
      meaningValue: meaningValue || meaning,
      phraseValue: phraseValue || phrase,
      languajeValue: languaje || "",
      favValue: fav,
      imagenValue: imagenValue || imagen,
      setCardExists,
    });
    setEntryEdit(false);
    setIsLoadingCard(false);
  };

  const onEntryEdit = () => {
    setEntryEdit(true);
  };

  const onEntryDelete = async () => {
    setIsLoadingCard(true);
    const colRef = collection(
      db,
      "usuarios",
      userName,
      "lists",
      list
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      "cards"
    );
    await deleteDoc(doc(colRef, title));
    setIsLoadingCard(false);
    setCardExists(false);
  };

  const { lists, loadingLists } = useGetLists(userName);

  return (
    <>
      <div className="bg-white border-t-8 shadow-xl hover:border-gray-300 border-gray-200 p-5 rounded-lg relative">
        {isLoadingCard && (
          <div className="absolute | left-0 top-0 | w-full h-full | z-10 | animate-pulse | bg-slate-200"></div>
        )}
        <div className="relative">
          {!entryEdit && (
            <>
              <h3 className="text-2xl pr-10 mb-2 font-semibold">
                <Link href={`/${userId}/cards/${slugTitleValue}`}>
                  <a>{titleValue || title}</a>
                </Link>
              </h3>
              <p className="italic blur-sm hover:blur-0 cursor-default transition-all text-sm">{`(${
                meaningValue || meaning
              })`}</p>
            </>
          )}
          {entryEdit && (
            <div className="mb-2 z-50 ">
              <input
                value={titleValue}
                type="text"
                onChange={onTitleFieldChanges}
                className="w-full py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
              <input
                value={meaningValue}
                type="text"
                onChange={onMeaningFieldChanges}
                className="w-full mt-2 py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
            </div>
          )}
        </div>
        <div className="relative">
          {!entryEdit && (
            <p className="text-base italic blur-sm hover:blur-0 cursor-default transition-all">
              {descValue || description}
            </p>
          )}
          {entryEdit && (
            <>
              <div className="mb-2">
                <input
                  value={descValue}
                  type="text"
                  onChange={onDescFieldChanges}
                  className="w-full py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
                />
              </div>
              <div className="mb-2">
                <input
                  placeholder={imagenValue || imagen || "Imagen"}
                  value={imagenValue || imagen}
                  type="text"
                  onChange={onImagenFieldChanges}
                  className="w-full mt-2 py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
                />
              </div>
            </>
          )}
        </div>
        {!entryEdit && <hr className="my-2 border-gray-400" />}
        <div className="text-lg overflow-auto">
          {!entryEdit && (
            <>
              <span className="text-xs">Example:</span> <br />
              <div
                className="max-h-72 text-lg pb-5 text-gray-800 content max-w-full pr-5"
                dangerouslySetInnerHTML={{
                  __html: phraseValue || phrase,
                }}
              />
            </>
          )}
          {entryEdit && (
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
          )}
        </div>
        <p className="hidden">{status}</p>
        <div className="relative mt-5">
          {entryEdit && (
            <select
              className="px-4 py-3 w-full"
              onChange={onListFieldChanges}
              name="lists"
              id="lists"
              value={listValue || list}
            >
              {lists.map(({ id, title, chosenEmoji }) => (
                <option className="text-lg" key={id} value={title}>
                  {chosenEmoji} {title}
                </option>
              ))}
            </select>
          )}
        </div>
        <p className="hidden">languaje: {languaje}</p> <br />
        {fav && "Favorita"}
        {!entryEdit && (
          <>
            <button
              className="ml-5 text-sm absolute right-5 top-5"
              onClick={onEntryEdit}
            >
              <IconEdit />
            </button>
            <button
              className="ml-5 text-sm absolute right-10 top-5"
              onClick={onEntryDelete}
            >
              <IconDelete />
            </button>
          </>
        )}
        {memoCount}
        <div className="text-center">
          {imagenValue || imagen ? (
            <img
              src={imagenValue || imagen}
              alt="imagen"
              width="300"
              className="m-auto"
            />
          ) : null}
        </div>
        {!entryEdit && (
          <>
            <ContainerBtnViewMore>
              <div className="flex justify-center">
                <button onClick={() => setViewDefinitions(!viewDefinitions)}>
                  View more definitions
                </button>
              </div>
            </ContainerBtnViewMore>
            {viewDefinitions && (
              <Definitions selectWord={titleValue || title} />
            )}
          </>
        )}
        {entryEdit && (
          <>
            <div className="flex gap-2 justify-end">
              <ContainerBtnSave>
                <div className="flex items-center gap-1">
                  <IconBtnSave />
                  <button className="cursor-default" onClick={onUpdate}>
                    Save
                  </button>
                </div>
              </ContainerBtnSave>
              <ContainerBtnCancel>
                <button
                  className="cursor-default"
                  onClick={() => setEntryEdit(false)}
                >
                  Cancel
                </button>
              </ContainerBtnCancel>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default SingleCard;
