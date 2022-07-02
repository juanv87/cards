import Link from "next/link";
import React, { ChangeEvent, useContext, useState } from "react";
import { List, Note } from "../../interfaces";
import { ContainerCard } from "../layouts/ContainerCard";
import { ListsContext } from "../../context/lists/ListsContext";
import IconEdit from "../icons/IconEdit";
import { listEmojis } from "../emojis";
import { Editor } from "@tinymce/tinymce-react";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import { ContainerBtnCancel } from "../layouts/ContainerBtnCancel";
import IconBtnSave from "../icons/IconBtnSave";
import { NotesContext } from "../../context/notes";
interface Props {
  note: Note;
}
const SingleNote = ({ note }: Props) => {
  const [noteEdit, setNoteEdit] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const { title, description, content } = note;
  const { updateNote } = useContext(NotesContext);
  const newNoteUpdate = {
    ...note,
    title: titleValue !== "" ? titleValue : title,
    description: descriptionValue !== "" ? descriptionValue : description,
    content: contentValue !== "" ? contentValue : content,
  };

  const onTitleFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };
  const onDescFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  };
  const onContentFieldChanges = (content: any) => {
    setContentValue(content);
  };

  const onUpdate = () => {
    updateNote(newNoteUpdate);
    setNoteEdit(false);
  };
  const onNoteEdit = () => {
    setNoteEdit(true);
  };
  return (
    <>
      <ContainerCard>
        {!noteEdit && (
          <h3 className="text-2xl flex gap-1 mb-2">
            <Link href={`/dashboard/notes/${note._id}`}>
              <a>{titleValue || title}</a>
            </Link>
          </h3>
        )}
        {noteEdit && (
          <>
            <div className="fles items-center">
              <input
                value={titleValue || title}
                type="text"
                onChange={onTitleFieldChanges}
                className="py-2 px-1 pl-2 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none mb-3"
              />
            </div>
          </>
        )}
        {!noteEdit && (
          <p className="text-base flex gap-1 mb-2">
            {descriptionValue || description}
          </p>
        )}
        {noteEdit && (
          <>
            <div className="fles items-center">
              <input
                value={descriptionValue || description}
                type="text"
                onChange={onDescFieldChanges}
                className="py-2 px-1 pl-2 border-b-2 bg-gray-200 border-none focus-visible:outline-none focus:border-none mb-3"
              />
            </div>
          </>
        )}
        {!noteEdit && (
          <div
            className="boxPreview max-h-40 text-base pb-5 text-gray-800 max-w-full pr-5"
            dangerouslySetInnerHTML={{
              __html: contentValue || content || "",
            }}
          />
        )}
        {noteEdit && (
          <Editor
            apiKey="urxgaopom4tpzlamq09oxy8hyu0hxifvc57jc0esxnsnbm0y"
            value={contentValue || content}
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
            onEditorChange={onContentFieldChanges}
          />
        )}
        {!noteEdit && (
          <button
            className="ml-5 text-sm absolute right-5 top-5"
            onClick={onNoteEdit}
          >
            <IconEdit />
          </button>
        )}
        {noteEdit && (
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
                  onClick={() => setNoteEdit(false)}
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
export default SingleNote;
