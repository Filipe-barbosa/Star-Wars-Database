import React from "react";
import { useAPI } from "./ContextApi";
import SearchFilterName from "./SearchFilters";
import {
  Table as HeaderTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export default function Table() {
  const { isLoading, filtersState, selectColumns } = useAPI();
  return (
    <div>
      <SearchFilterName />
      {isLoading && <p>Loading...</p>}
      <HeaderTable variant="striped" size="sm">
        <TableCaption>StarTable</TableCaption>
        <Thead>
          <Tr>
            {selectColumns &&
              selectColumns.map((heading) => <Th>{heading}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {filtersState.filters.filteredResults.map((data) => (
            <Tr>
              {selectColumns &&
                selectColumns.map((column) => <Td>{data[column]}</Td>)}
            </Tr>
          ))}
        </Tbody>
      </HeaderTable>
    </div>
  );
}
