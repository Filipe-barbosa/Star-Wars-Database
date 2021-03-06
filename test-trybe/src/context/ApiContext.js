import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();
const allFilterOptions = [
  "population",
  "orbital_period",
  "diameter",
  "rotation_period",
  "surface_water",
];

function ApiContext({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersState, setFiltersState] = useState({
    filters: {
      filteredResults: [],
      filterByName: {
        name: "",
      },
      filterByNumericValues: [],
    },
  });
  const selectColumns = data[0] && Object.keys(data[0]);
  const selectedOptions = filtersState.filters.filterByNumericValues.map(
    (filter) => filter.column
  );

  useEffect(() => {
    fetch(
      `https://swapi-trybe.herokuapp.com/api/planets/?search=${filtersState.filters.filterByName.name}`
    )
      .then((response) => response.json())
      .then((data) =>
        data.results.map((item) => {
          const { residents, ...filteredResult } = item;
          return filteredResult;
        })
      )
      .then((results) => {
        setData(results);
        setIsLoading(false);
      });
  }, [filtersState.filters.filterByName.name]);

  useEffect(() => {
    setFiltersState((state) => ({
      filters: {
        ...state.filters,
        filteredResults: applyFiltersToResults(
          data,
          state.filters.filterByNumericValues
        ),
      },
    }));
  }, [data, filtersState.filters.filterByNumericValues]);

  function searchName(name) {
    setFiltersState({
      filters: {
        ...filtersState.filters,
        filterByName: { name },
      },
    });
  }
  const addNewFilter = () => {
    setFiltersState({
      filters: {
        ...filtersState.filters,
        filterByNumericValues: [
          ...filtersState.filters.filterByNumericValues,
          {
            column: "",
            comparison: "",
            value: "",
          },
        ],
      },
    });
  };
  const selectFilterColumn = (position, column) => {
    const newFilterByNumericValues =
      filtersState.filters.filterByNumericValues.map((value, index) => {
        if (position === index) {
          return {
            ...value,
            column,
          };
        }
        return value;
      });
    setFiltersState({
      filters: {
        ...filtersState.filters,
        filterByNumericValues: newFilterByNumericValues,
      },
    });
  };
  const removeFilterByNumericValue = (position, filters) => {
    const newFilterByNumericValues = filters.filterByNumericValues.filter(
      (_, index) => position !== index
    );
    setFiltersState({
      filters: {
        ...filtersState.filters,
        filterByNumericValues: newFilterByNumericValues,
      },
    });
  };
  const selectComparisonFilter = (position, comparison) => {
    setFiltersState({
      filters: {
        ...filtersState.filters,
        filterByNumericValues: [
          ...filtersState.filters.filterByNumericValues.map((item, index) => {
            if (position === index) {
              return {
                ...item,
                comparison,
              };
            }
            return item;
          }),
        ],
      },
    });
  };
  const selectValueFilter = (position, value) => {
    setFiltersState({
      filters: {
        ...filtersState.filters,
        filterByNumericValues: [
          ...filtersState.filters.filterByNumericValues.map((item, index) => {
            if (position === index) {
              return {
                ...item,
                value,
              };
            }
            return item;
          }),
        ],
      },
    });
  };

  return (
    <APIContext.Provider
      value={{
        data,
        selectColumns,
        isLoading,
        filtersState,
        searchName,
        addNewFilter,
        selectFilterColumn,
        selectComparisonFilter,
        selectValueFilter,
        selectedOptions,
        allFilterOptions,
        removeFilterByNumericValue,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default ApiContext;

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

function applyFiltersToResults(results, filters) {
  if (!results || !filters) return [];

  let filteredResults = results;
  for (const filter of filters) {
    const { column, comparison, value } = filter;
    if (!column || !comparison || !value) continue;
    switch (comparison) {
      case "=":
        filteredResults = filteredResults.filter(
          (item) => item[column] === value
        );
        continue;
      case ">":
        filteredResults = filteredResults.filter(
          (item) => item[column] > value
        );
        continue;
      case "<":
        filteredResults = filteredResults.filter(
          (item) => item[column] < value
        );
        continue;
      // no default
    }
  }
  return filteredResults;
}
