import React, { FC, useContext, useMemo } from "react";
import { ListStatus } from "../../interfaces";
import SingleList from "./SingleNote";
import { ListsContext } from "../../context/lists/ListsContext";
import { NotesContext } from "../../context/notes";
import SingleNote from "./SingleNote";

const NotesList: FC = () => {
  const { notes } = useContext(NotesContext);

  return (
    <>
      <div className="grid grid-cols-12 gap-5 w-full">
        {notes.map((notes) => (
          <div key={notes.id} className="col-span-3 mt-8">
            <SingleNote note={notes} />
          </div>
        ))}
      </div>
    </>
  );
};

export default NotesList;
