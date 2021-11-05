import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();

function FetchApi({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch data
  useEffect(() => {
    fetch(`https://swapi-trybe.herokuapp.com/api/planets/`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setIsLoading(false);
      });
  }, []);

  return (
    <APIContext.Provider value={{ data, isLoading }}>
      {children}
    </APIContext.Provider>
  );
}

export default FetchApi;

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
