/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState } from "react";

export const QuerySearchContext = createContext();
export const useSearch = () => useContext(QuerySearchContext);

export function QuerySearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  return (
    <QuerySearchContext.Provider value={{ searchQuery, onChangeSearch }}>
      {children}
    </QuerySearchContext.Provider>
  );
}
