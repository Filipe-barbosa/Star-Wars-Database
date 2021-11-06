import React from "react";
import { useAPI } from "./ContextApi";
import SearchFilterName from "./SearchFilters";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export default function GenerateTable() {
  const { isLoading, data } = useAPI();
  const columns = data[0] && Object.keys(data[0]);
  return (
    <div>
      <SearchFilterName />
      {isLoading && <p>Loading...</p>}
      <Table variant="striped" size="sm">
        <TableCaption>StarTable</TableCaption>
        <Thead>
          <Tr>{data[0] && columns.map((heading) => <Th>{heading}</Th>)}</Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr>
              {columns.map((column) => (
                <Td>{row[column]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
