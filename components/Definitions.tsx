import React, { useState, useEffect } from "react";
import { getWords } from "../services/words";

const Definitions = ({ selectWord }: any) => {
  const [words, setWords] = useState([]);
  useEffect(() => {
    getWords(selectWord).then((data) => {
      setWords(data);
    });
  }, []);
  return (
    <>
      <ul className="mt-5 text-sm">
        {words.length > 0 &&
          words.map(({ word, meanings }) => (
            <li key={word}>
              <ul>
                <li>
                  {meanings.map(({ definitions }) => {
                    return definitions.map(({ definition, example }) => (
                      <div key={definition} className="definition mb-2">
                        <p>
                          <strong>Definition:</strong> {definition}
                        </p>
                        {example && (
                          <p>
                            <strong>Example:</strong> {example}
                          </p>
                        )}
                      </div>
                    ));
                  })}
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Definitions;
