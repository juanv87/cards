import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useState,
} from "react";
import { EntriesContext } from "../../context/entries";
import { ListsContext } from "../../context/lists";
import { Entry } from "../../interfaces";
import IconBtnSave from "../icons/IconBtnSave";
import IconEdit from "../icons/IconEdit";
import IconTag from "../icons/IconTag";
import { ContainerBtnCancel } from "../layouts/ContainerBtnCancel";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import { ContainerCard } from "../layouts/ContainerCard";

interface Props {
  entry: Entry;
}
const SingleCard = ({ entry }: Props) => {
  const [entryEdit, setEntryEdit] = useState(false);
  const [titleValue, settitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [phraseValue, setPhraseValue] = useState("");
  const [meaningValue, setMeaningValue] = useState("");
  const [listValue, setListValue] = useState("");

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

  const {
    title,
    meaning,
    phrase,
    description,
    status,
    list,
    fav,
    languaje,
    _id,
  } = entry;
  const { updateEntry } = useContext(EntriesContext);
  const newEntryUpdate = {
    ...entry,
    title: titleValue !== "" ? titleValue : title,
    description: descValue !== "" ? descValue : description,
    phrase: phraseValue !== "" ? phraseValue : phrase,
    meaning: meaningValue !== "" ? meaningValue : meaning,
    list:
      listValue !== ""
        ? listValue
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
        : list,
  };

  const onUpdate = () => {
    updateEntry(newEntryUpdate);
    setEntryEdit(false);
  };

  const onEntryEdit = () => {
    setEntryEdit(true);
  };

  const { lists } = useContext(ListsContext);

  return (
    <>
      <ContainerCard>
        <div className="relative">
          {!entryEdit && (
            <>
              <h3 className="text-2xl pr-10 mb-2 font-semibold">
                <Link href={`/dashboard/cards/${_id}`}>
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
                value={titleValue || title}
                type="text"
                onChange={onTitleFieldChanges}
                className="w-full py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
              <input
                value={meaningValue || meaning}
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
            <div className="mb-2">
              <input
                value={descValue || description}
                type="text"
                onChange={onDescFieldChanges}
                className="w-full py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
            </div>
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
              value={phraseValue || phrase}
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
          {!entryEdit && (
            <>
              <Link href={`/dashboard/lists/${list}`}>
                <a className="text-white">
                  <div className="flex items-center rounded-full bg-slate-500 float-left px-2 py-1">
                    <IconTag size="30" color="white" />
                    <span className="mr-2">{listValue || list}</span>
                  </div>
                </a>
              </Link>
            </>
          )}
          {entryEdit && (
            <select
              className="px-4 py-3 w-full"
              onChange={onListFieldChanges}
              name="lists"
              id="lists"
            >
              {lists.map(({ _id, title, chosenEmoji }) => (
                <option className="text-lg" selected key={_id} value={title}>
                  {chosenEmoji} {title}
                </option>
              ))}
            </select>
          )}
        </div>
        <p className="hidden">languaje: {languaje}</p> <br />
        {fav && "Favorita"}
        {!entryEdit && (
          <button
            className="ml-5 text-sm absolute right-5 top-5"
            onClick={onEntryEdit}
          >
            <IconEdit />
          </button>
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
      </ContainerCard>
    </>
  );
};
export default SingleCard;
