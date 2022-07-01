import Link from "next/link";
import React, { ChangeEvent, useContext, useState } from "react";
import { List } from "../../interfaces";
import { ContainerCard } from "../layouts/ContainerCard";
import { ListsContext } from "../../context/lists/ListsContext";
import IconEdit from "../icons/IconEdit";
import { listEmojis } from "../emojis";
import { Editor } from "@tinymce/tinymce-react";
interface Props {
  list: List;
}
const SingleList = ({ list }: Props) => {
  const [listEdit, setListEdit] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [newSlugTitleValue, setNewSlugTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [emojiValue, setEmojiValue] = useState("");

  const { title, description, slugTitleValue, chosenEmoji } = list;
  const { updateList } = useContext(ListsContext);
  const newListUpdate = {
    ...list,
    title: titleValue !== "" ? titleValue : title,
    slugTitleValue:
      newSlugTitleValue !== ""
        ? newSlugTitleValue
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
        : slugTitleValue,
    description: descriptionValue !== "" ? descriptionValue : description,
    chosenEmoji: emojiValue !== "" ? emojiValue : chosenEmoji,
  };

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    setNewSlugTitleValue(event.target.value);
  };
  const onDescFieldChanges = (content: any) => {
    setDescriptionValue(content);
  };
  const onEmojiClick = (event: ChangeEvent<HTMLSelectElement>) => {
    setEmojiValue(event.target.value);
  };

  const onUpdate = () => {
    updateList(newListUpdate);
    setListEdit(false);
  };
  const onListEdit = () => {
    setListEdit(true);
  };
  return (
    <ContainerCard>
      {listEdit && (
        <>
          <button onClick={onUpdate}>Actualizar</button>
          <button onClick={() => setListEdit(false)}>Cancelar</button>
        </>
      )}
      <h3 className="text-2xl flex gap-1">
        {!listEdit && (emojiValue || chosenEmoji)}
        {listEdit && (
          <select
            className="cursor-pointer"
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
        )}
        <Link
          href={`/dashboard/lists/${
            newSlugTitleValue
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/[^\w-]+/g, "") || slugTitleValue
          }`}
        >
          <a>{titleValue || title}</a>
        </Link>
      </h3>
      {listEdit && (
        <input
          value={titleValue}
          type="text"
          placeholder={title}
          onChange={onTitleFieldChanges}
          className="w-full mt-2 py-1 px-1 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none"
        />
      )}
      <div
        className="max-h-40 text-base pb-5 text-gray-800 content float-left nota-content max-w-full pr-5"
        dangerouslySetInnerHTML={{
          __html: descriptionValue || description || "",
        }}
      />
      {listEdit && (
        <Editor
          apiKey="urxgaopom4tpzlamq09oxy8hyu0hxifvc57jc0esxnsnbm0y"
          value={descriptionValue}
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
      )}
      <button
        className="ml-5 text-sm absolute right-5 top-5"
        onClick={onListEdit}
      >
        <IconEdit />
      </button>
    </ContainerCard>
  );
};
export default SingleList;
