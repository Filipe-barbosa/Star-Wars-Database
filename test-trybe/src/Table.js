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
  Container,
  Stack,
} from "@chakra-ui/react";

export default function GenerateTable() {
  const { isLoading, data } = useAPI();
  console.log(data);
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <SearchFilterName />
        {isLoading && <p>Loading...</p>}
        <Table variant="striped" size="sm">
          <TableCaption>StarTable</TableCaption>
          <Thead>
            <Tr>

              <Th>Nome</Th>
              <Th> Clima</Th>
              <Th>Diametro</Th>
              <Th>Criação</Th>
              <Th>Edição</Th>
              <Th>Gravidade</Th>
              <Th>Filme</Th>
              <Th>Orbita</Th>
              <Th>População</Th>
              <Th>P.Rotação</Th>
              <Th>Agua da superficie</Th>
              <Th>Terreno</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((data) => {
              return (
                <Tr>
                  <Td>{data.name}</Td>
                  <Td>{data.climate}</Td>
                  <Td>{data.diameter}</Td>
                  <Td>{data.created}</Td>
                  <Td>{data.edited}</Td>
                  <Td> {data.gravity} </Td>
                  <Td> {data.films} </Td>
                  <Td> {data.orbital_period} </Td>
                  <Td>{data.population}</Td>
                  <Td>{data.rotation_period}</Td>
                  <Td>{data.surface_water}</Td>
                  <Td>{data.terrain}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
