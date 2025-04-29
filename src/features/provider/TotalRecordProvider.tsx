"use client";

import React, { useMemo, useState } from "react";

export type TotalRecord = {
  wordsPerMinutes: number[];
  characterPerMinutes: number[];
  accuracies: number[];
};

type RecordUpdateHandlerParameter = {
  wordsPerMinute: number;
  characterPerMinute: number;
  accuracy: number;
};

const TotalRecordContext = React.createContext<
  | (TotalRecord & {
      updateTotalRecord: (params: RecordUpdateHandlerParameter) => void;
      resetRecord: () => void;
    })
  | null
>(null);

export const useTotalRecord = () => {
  const value = React.useContext(TotalRecordContext);

  if (!value) {
    throw new Error("TotalRecordProvider is not found");
  }

  return value;
};

export const TotalRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<TotalRecord>({
    accuracies: [],
    characterPerMinutes: [],
    wordsPerMinutes: [],
  });

  const value = useMemo(
    () => ({
      ...data,
      resetRecord: () => {
        setData({
          accuracies: [],
          characterPerMinutes: [],
          wordsPerMinutes: [],
        });
      },
      updateTotalRecord: ({
        wordsPerMinute,
        characterPerMinute,
        accuracy,
      }: RecordUpdateHandlerParameter) => {
        setData(({ accuracies, characterPerMinutes, wordsPerMinutes }) => ({
          accuracies: [...accuracies, accuracy],
          characterPerMinutes: [...characterPerMinutes, characterPerMinute],
          wordsPerMinutes: [...wordsPerMinutes, wordsPerMinute],
        }));
      },
    }),
    [data],
  );

  return (
    <TotalRecordContext.Provider value={value}>
      {children}
    </TotalRecordContext.Provider>
  );
};
