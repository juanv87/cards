import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useMemo,
  useState,
} from "react";
import { EntriesContext } from "../../context/entries";
import { NotesContext } from "../../context/notes";
import { Entry, List } from "../../interfaces";
import IconBtnSave from "../icons/IconBtnSave";
import { ContainerBtnSave } from "../layouts/ContainerBtnSave";
import { ContainerCard } from "../layouts/ContainerCard";
interface Props {
  entries: Entry[];
  listSlug?: string;
  list: string;
}
const SingleCardQuizNote = ({ entries, listSlug, list }: Props) => {
  console.log(list);

  const [titleValue, settitleValue] = useState("Nueva Quiz");
  const [descValue, setDescValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [listValue, setListValue] = useState(listSlug || "");

  const entriesByList = useMemo(
    () => entries.filter(({ list }) => list === listSlug),
    [entries]
  );

  const entry = useMemo(
    () => entriesByList[Math.floor(Math.random() * entriesByList.length)],
    [entriesByList]
  );

  // const entriesByList = useMemo(
  //   () => entries.filter(({ list }) => list === listSlug),
  //   [entries]
  // );

  // () => Math.random() - 0.5

  //const randomEntry = entries[Math.floor(Math.random() * entries.length)];

  //const textRandomEntries = randomEntries.map(({ title }) => title);

  const { addNewNote } = useContext(NotesContext);

  const onSave = () => {
    addNewNote(titleValue, descValue, contentValue, list);
  };

  const onContentFieldChanges = (content: any) => {
    settitleValue("💡 Quiz using: " + entry?.title);
    setContentValue(content);
  };

  return (
    <>
      <div className="w-96 mt-10">
        <ContainerCard>
          <h2 className="text-xl text-center mb-2">💡 Quiz</h2>
          <p className="text-center mb-2">Escribe un párrafo usando:</p>
          <p className="text-2xl text-center mb-5">{entry?.title}</p>
          <hr className="my-5" />
          <Editor
            apiKey="urxgaopom4tpzlamq09oxy8hyu0hxifvc57jc0esxnsnbm0y"
            value={contentValue}
            init={{
              height: 200,
              menubar: false,
              icons: "thin",
            }}
            onEditorChange={onContentFieldChanges}
          />
          <div className="flex justify-center items-center gap-5">
            <ContainerBtnSave>
              <div className="flex items-center gap-1">
                <IconBtnSave />
                <button className="cursor-default" onClick={onSave}>
                  Save
                </button>
              </div>
            </ContainerBtnSave>
          </div>
        </ContainerCard>
      </div>
    </>
  );
};
export default SingleCardQuizNote;
