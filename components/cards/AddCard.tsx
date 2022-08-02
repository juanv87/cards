/* eslint-disable @next/next/no-img-element */
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { EntriesContext } from "../../context/entries";
import { ListsContext } from "../../context/lists";
import { Editor } from "@tinymce/tinymce-react";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import IconAddCard from "../icons/IconAddCard";
import IconSearch from "../icons/IconSearch";

import PhotoExample from "../StockPhotos/PhotoExample";
import useGetImageByTitleValue from "../hooks/useGetImageByTitleValue";
import { authContext } from "../../context/authContext";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
interface Props {
  currentList?: string;
}
const AddCard = ({ currentList }: Props) => {
  const { user } = useContext(authContext);
  const emailUser = user && user.email;
  const [loadingCards, setLoadingCards] = useState(true);
  const [cards, setCards] = useState([]);

  const { addNewEntry } = useContext(EntriesContext);
  const [titleValue, settitleValue] = useState("");
  const [meaningValue, setMeaningValue] = useState("");
  const [phraseValue, setPhraseValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [listValue, setListValue] = useState(currentList || "");
  const [languajeValue, setLanguajeValue] = useState("");
  const [favValue, setFavValue] = useState(false);
  const [statusValue, setStatusValue] = useState("publish");
  const [imagenValue, setImagenValue] = useState("");

  const [titleSearch, setTitleSearch] = useState("");

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
  const onImagenFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setImagenValue(event.target.value);
  };

  // const { lists } = useContext(ListsContext);
  const image = useGetImageByTitleValue(titleValue);

  const [lists, setLists] = useState([]);
  const getData = async () => {
    if (user) {
      setLoadingCards(true);
      const colRef = collection(db, "usuarios", user.email.split("@")[0], "lists");
      const data = await getDocs(colRef);
      setLists(user && data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  const onSave = async () => {
    if (titleValue.length === 0) return;
    await setDoc(
      doc(db, "usuarios", user.email.split("@")[0], "lists", listValue, "cards", titleValue),
      {
        title: titleValue,
        description: descValue,
        meaning: meaningValue,
        phrase: phraseValue,
        list: listValue,
        fav: favValue,
        languaje: languajeValue,
        slugTitleValue: titleValue
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        imagen: imagenValue,
        memoCount: 0,
        userId: user.uid,
      }
    );
    settitleValue("");
    setMeaningValue("");
    setPhraseValue("");
    setDescValue("");
    setListValue("");
    setLanguajeValue("");
    setImagenValue("");
  };
  const onSearchWord = () => {
    setTitleSearch(titleValue);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="grid gap-2 col-span-4 mt-5">
          <div className="flex gap-3 items-center">
            <input
              value={titleValue}
              id="title"
              type="text"
              placeholder="Title"
              onChange={onTitleFieldChanges}
              className="py-3 px-2 border-none w-full"
            />
            <button
              className="text-sm rounded-md bg-slate-600 hover:bg-slate-700 text-white uppercase p-1 cursor-default"
              onClick={onSearchWord}
            >
              <IconSearch color="white" size="35" />
            </button>
          </div>
          <input
            value={meaningValue}
            type="text"
            placeholder="Meaning"
            onChange={onMeaningFieldChanges}
            className="py-3 px-2 border-none my-2"
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
              {lists.map(({ id, title, chosenEmoji }) => (
                <option key={id} value={title}>
                  {chosenEmoji} {title}
                </option>
              ))}
            </select>
          )}
          <input
            value={imagenValue}
            type="text"
            placeholder="Image"
            onChange={onImagenFieldChanges}
            className="py-3 px-2 border-none mb-2"
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
        <div className="preview mt-5 min-w-min col-span-4 ">
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
            <img src={imagenValue} alt="" width="500" />
          </div>
        </div>
        <div className="col-span-4">
          {/* {searchIframe && (
            <>
              <iframe
                src={`https://dictionary.cambridge.org/es/diccionario/ingles/${titleValue}`}
                height="500"
                title="Iframe Example"
              ></iframe>
            </>
          )} */}
        </div>
      </div>
      <style jsx>{`
        iframe {
          width: 100%;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default AddCard;
