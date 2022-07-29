import React, { useState, useEffect } from "react";
import { getWords } from "../services/words";
import { useGetDefinitionsByWord } from "./hooks/useGetDefinitionsByWord";

const Definitions = ({ selectWord }: any) => {
  const wordDefinition = useGetDefinitionsByWord(selectWord);

  return (
    <>
      <ul className="mt-5 text-sm">
        {wordDefinition.length > 0 &&
          wordDefinition.map(({ word, meanings }: any) => (
            <li key={word}>
              <ul>
                <li>
                  {meanings?.map(({ definitions }: any) => {
                    return definitions.map(({ definition, example }: any) => (
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
