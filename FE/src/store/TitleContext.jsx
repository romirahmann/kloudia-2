/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

export const TitleContext = createContext();
export const useTitle = () => useContext(TitleContext);

export function TitleProvider({ children }) {
  const [titleData, setTitleData] = useState(() => {
    const saved = sessionStorage.getItem("titleData");
    return saved
      ? JSON.parse(saved)
      : { titlePage: "DASHBOARD", titleDesc: "Let's check your update!" };
  });

  const updateTitle = (newTitle) => {
    setTitleData(newTitle);
    sessionStorage.setItem("titleData", JSON.stringify(newTitle));
  };

  return (
    <TitleContext.Provider value={{ titleData, updateTitle }}>
      {children}
    </TitleContext.Provider>
  );
}
