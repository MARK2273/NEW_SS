import React, { createContext, ReactNode, useState } from "react";

export const AmountContext: React.Context<{
  finalAmount: number;
  setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
} | null> = createContext<{
  finalAmount: number;
  setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const AmountProvider: ({ children }: {
  children: ReactNode;
}) => React.JSX.Element = ({ children }: { children: ReactNode }):JSX.Element => {
  const [finalAmount, setFinalAmount] = useState(0);
  return (
    <AmountContext.Provider value={{ finalAmount, setFinalAmount }}>
      {children}
    </AmountContext.Provider>
  );
};
