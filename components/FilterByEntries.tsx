import React, { useEffect, useState } from "react";
import { Entry } from "../interfaces";
import SingleCard from "./cards/SingleCard";

const FilterByEntries = ({ entries }: Entry[]) => {
  const [entriesFiltered, setEntriesFiltered] = useState(entries);
  const handleEntriesFiltered = () => {
    const entriesFilter = (
      document.querySelector("#entriesFilter") as HTMLInputElement
    ).value;
    const entriesArray = entries.filter(({ title }) => {
      return title.toLowerCase().includes(entriesFilter.toLowerCase());
    });
    setEntriesFiltered(entriesFilter.length > 0 ? entriesArray : entries);
  };

  useEffect(() => {
    setEntriesFiltered(entries);
  }, [entries]);
  return (
    <>
      <input
        type="text"
        id="entriesFilter"
        onChange={handleEntriesFiltered}
        placeholder="Filter entries"
        className="rounded-md border-2 border-slate-700 h-16 p-2 text-2xl pl-5"
      />
      <div className="grid grid-cols-12 gap-5 w-full">
        {entriesFiltered.map((entry) => (
          <div key={entry._id} className="col-span-4 mt-8">
            <SingleCard entry={entry} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterByEntries;
