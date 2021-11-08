import {
  Input,
  Text,
  Stack,
  Select,
  Box,
  Button,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import { useAPI } from "./context/ContextApi";

export default function Filters() {
  const { filtersState, searchName, addNewFilter } = useAPI();
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.700")}
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
    >
      <Container maxW={"3xl"} py={3} as={Stack} padding={1}>
        <Stack direction={"row"}>
          <Box
            padding="1rem"
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            maxH="108px"
            bg={useColorModeValue("white", "gray.700")}
          >
            <Stack direction="column" align={"center"}>
              <Text>Name Filter</Text>
              <Input
                value={filtersState.filters.filterByName.name}
                onChange={(event) => searchName(event.target.value)}
                placeholder="Filtrar por nome"
              />
            </Stack>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.700")}
            maxW={"5xl"}
            py={2}
            flex="3"
            rounded={"xl"}
            align={"center"}
            paddingTop="0.5rem"
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Stack spacing={0} align={"center"}>
              <Text>Number Filters</Text>
            </Stack>
            <Stack p={3}>
              <Stack direction="column">
                <Stack spacing={3} direction={"row"}>
                  <Button onClick={addNewFilter}>Add</Button>
                  <Stack direction="column">
                    <SelectFilter />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
const SelectFilter = () => {
  const {
    filtersState,
    selectFilterColumn,
    selectComparisonFilter,
    selectValueFilter,
    selectedOptions,
    allFilterOptions,
  } = useAPI();
  return filtersState.filters.filterByNumericValues.map(
    ({ column, comparison, value }, index) => (
      <Stack
        direction="row"
        bg={"white"}
        boxShadow={"lg"}
        p={3}
        rounded={"xl"}
        spacing="11"
        align={"center"}
        pos={"relative"}
        borderWidth="1px"
        borderRadius="md"
      >
        <Select
          id="1"
          variant="flushed"
          value={column}
          placeholder="select Column"
          onChange={(event) => selectFilterColumn(index, event.target.value)}
        >
          {allFilterOptions.map((option) => (
            <option value={option} disabled={selectedOptions.includes(option)}>
              {option}
            </option>
          ))}
        </Select>
        <Select
          variant="flushed"
          value={comparison}
          placeholder="select comparison"
          onChange={(event) =>
            selectComparisonFilter(index, event.target.value)
          }
        >
          <option value=">">maior que </option>
          <option value="<">menor que </option>
          <option value="=">igual </option>
        </Select>
        <Input
          variant="flushed"
          value={value}
          type="number"
          onChange={(event) => selectValueFilter(index, event.target.value)}
          placeholder="Valor"
        ></Input>
        <CloseButton />
      </Stack>
    )
  );
};
