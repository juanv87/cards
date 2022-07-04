import Link from "next/link";
import React, { ChangeEvent, useContext, useState } from "react";
import { List } from "../../interfaces";
import { ContainerCard } from "../layouts/ContainerCard";
import { ListsContext } from "../../context/lists/ListsContext";
import IconEdit from "../icons/IconEdit";
import { listEmojis } from "../emojis";
import { Editor } from "@tinymce/tinymce-react";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import { ContainerBtnCancel } from "../layouts/ContainerBtnCancel";
import IconBtnSave from "../icons/IconBtnSave";
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
    <>
      <ContainerCard>
        {!listEdit && (
          <h3 className="text-2xl flex gap-1 mb-2">
            {!listEdit && (emojiValue || chosenEmoji)}

            <Link href={`/dashboard/lists/${list._id}`}>
              <a>{titleValue || title}</a>
            </Link>
          </h3>
        )}
        {listEdit && (
          <>
            <div className="flex items-center">
              <select
                value={emojiValue || chosenEmoji}
                className="mr-2"
                onChange={onEmojiClick}
                name="lists"
                id=""
              >
                {listEmojis.map(({ title, id }) => (
                  <option className="pl-1 text-2xl" key={id} value={title}>
                    {title}
                  </option>
                ))}
              </select>
              <input
                value={titleValue || title}
                type="text"
                onChange={onTitleFieldChanges}
                className="py-2 px-1 pl-2 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none mb-3"
              />
            </div>
          </>
        )}
        {!listEdit && (
          <div
            className="boxPreview max-h-40 text-base pb-5 text-gray-800 max-w-full pr-5"
            dangerouslySetInnerHTML={{
              __html: descriptionValue || description || "",
            }}
          />
        )}
        {listEdit && (
          <Editor
            apiKey="urxgaopom4tpzlamq09oxy8hyu0hxifvc57jc0esxnsnbm0y"
            value={descriptionValue || description}
            init={{
              height: 150,
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
        {!listEdit && (
          <button
            className="ml-5 text-sm absolute right-5 top-5"
            onClick={onListEdit}
          >
            <IconEdit />
          </button>
        )}
        {listEdit && (
          <>
            <div className="flex gap-2 justify-end mt-2">
              <ContainerBtnSave>
                <button className="cursor-default" onClick={onUpdate}>
                  <div className="flex items-center gap-1">
                    <IconBtnSave />
                    Save
                  </div>
                </button>
              </ContainerBtnSave>
              <ContainerBtnCancel>
                <button
                  className="cursor-default"
                  onClick={() => setListEdit(false)}
                >
                  Cancel
                </button>
              </ContainerBtnCancel>
            </div>
          </>
        )}
      </ContainerCard>
      <style jsx>{`
        .boxPreview ul {
          display: none !important;
        }
        .boxPreview ul li {
          list-style-type: circle;
        }
      `}</style>
    </>
  );
};
export default SingleList;
