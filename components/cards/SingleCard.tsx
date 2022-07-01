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
import IconEdit from "../icons/IconEdit";
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
  const onPhraseFieldChanges = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPhraseValue(event.target.value);
  };
  const onMeaningFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setMeaningValue(event.target.value);
  };
  const onListFieldChanges = (event: ChangeEvent<HTMLSelectElement>) => {
    setListValue(event.target.value);
  };

  const { title, meaning, phrase, description, status, list, fav, languaje } =
    entry;
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
          <h3 className="text-2xl pr-10">
            {title}
            <p className="italic blur-sm hover:blur-0 cursor-default transition-all text-sm">{`(${meaning})`}</p>
          </h3>
          {entryEdit && (
            <div className="-mt-6 mb-2 z-50 ">
              <input
                value={titleValue}
                type="text"
                placeholder={title}
                onChange={onTitleFieldChanges}
                className="w-full py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
              <input
                value={meaningValue}
                type="text"
                placeholder={meaning}
                onChange={onMeaningFieldChanges}
                className="w-full mt-2 py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
            </div>
          )}
        </div>
        <button
          className="ml-5 text-sm absolute right-5 top-5"
          onClick={onEntryEdit}
        >
          <IconEdit />
        </button>
        <div className="relative">
          <p className="text-base italic blur-sm hover:blur-0 cursor-default transition-all">
            {description || "Without description"}
          </p>
          {entryEdit && (
            <div className="-mt-5 mb-2">
              <input
                value={descValue}
                type="text"
                placeholder={description || "Add description"}
                onChange={onDescFieldChanges}
                className="w-full py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
            </div>
          )}
        </div>
        <hr className="my-2 border-gray-400" />
        <div className="text-base overflow-auto">
          <span className="text-xs">Example:</span> <br />
          <div
            className="max-h-72 text-base pb-5 text-gray-800 content float-left nota-content max-w-full pr-5"
            dangerouslySetInnerHTML={{
              __html: phrase || "Phrase in context",
            }}
          />
          {entryEdit && (
            <div className="-mt-12">
              <textarea
                rows={4}
                value={phraseValue}
                placeholder={phrase || "Add phrase in context"}
                onChange={onPhraseFieldChanges}
                className="w-full py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
              />
            </div>
          )}
        </div>
        <p className="hidden">{status}</p>
        <br />
        <div className="relative mt-5">
          List:{" "}
          <Link href={`/dashboard/lists/${list}`}>
            <a>{list}</a>
          </Link>
          <br />
          {entryEdit && (
            <select
              className="px-4 py-3"
              onChange={onListFieldChanges}
              name="lists"
              id="lists"
            >
              {lists.map(({ _id, title }) => (
                <option selected key={_id} value={title}>
                  {title}
                </option>
              ))}
            </select>
          )}
        </div>
        <p className="hidden">languaje: {languaje}</p> <br />
        {fav && "Favorita"}
      </ContainerCard>
      {entryEdit && (
        <>
          <button onClick={onUpdate}>Actualizar</button>
          <button onClick={() => setEntryEdit(false)}>Cancelar</button>
        </>
      )}
    </>
  );
};
export default SingleCard;
