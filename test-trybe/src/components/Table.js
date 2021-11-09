import React from "react";
import { useAPI } from "../context/ApiContext";
import Filters from "./DesignedFilters";
import {
  Table as HeaderTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
  Stack,
  Heading,
} from "@chakra-ui/react";

export default function Table() {
  const { isLoading, filtersState, selectColumns } = useAPI();
  return (
    <Box display="flex">
      <Container maxW={"7xl"} py={16} as={Stack}>
        <Stack spacing={0} align={"center"} padding="1rem">
          <Heading>Desafio Start Wars PLanets</Heading>
        </Stack>
        <Filters />
        {isLoading ? (
          <Stack spacing={0} align={"center"}>
            <Heading>Loading...</Heading>
          </Stack>
        ) : (
          <Stack overflowX="scroll" padding="2rem">
            <HeaderTable variant="simple">
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
          </Stack>
        )}
        {filtersState.filters.filteredResults.length === 0 && !isLoading && (
          <Stack spacing={0} align={"center"}>
            <Heading>No results</Heading>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
