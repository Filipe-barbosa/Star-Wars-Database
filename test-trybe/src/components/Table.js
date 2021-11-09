import React from "react";
import { useAPI } from "../context/ApiContext";
import Filters from "./DesignerFilters";
import {
  Table as HeaderTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
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
        <Stack spacing={0} align={"center"}>
          <Heading>Star Worts PLanets</Heading>
        </Stack>

        <Filters />
        {isLoading && <p>Loading...</p>}
        <HeaderTable variant="simple" maxW={"7xl"}>
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
      </Container>
    </Box>
  );
}
