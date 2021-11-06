import {
  Input,
  Text,
  Stack,
  Select,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAPI } from "./ContextApi";

export default function SearchFilterName() {
  const { filtersState, searchName, addNewFilter } = useAPI();
  return (
    <div>
      <Text mb="8px">Value</Text>
      <Stack direction={"row"}>
        <Input
          value={filtersState.filters.filterByName.name}
          onChange={(event) => searchName(event.target.value)}
          placeholder="Filtrar por nome"
        />
        <Box
          mb={12}
          shadow="base"
          borderWidth="1px"
          alignSelf={{ base: "center", lg: "flex-start" }}
          borderColor={useColorModeValue("gray.200", "gray.500")}
          borderRadius={"xl"}
        >
          <Text mb="8px">Number Filters</Text>
          <Stack spacing={3} direction={"row"}>
            <Button
              onClick={addNewFilter}
              disabled={
                filtersState.filters.availableFilterOptions.length === 0
              }
            >
              Add
            </Button>
            <Stack direction="column">
              <SelectFilter />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
const SelectFilter = () => {
  const {
    filtersState,
    selectFilterColumn,
    selectComparisonFilter,
    selectValueFilter
  } = useAPI();
  return filtersState.filters.filterByNumericValues.map(
    ({ column, comparison, value }, index) => (
      <Stack direction="row">
        <Select
          id="1"
          variant="flushed"
          value={column}
          onChange={(event) => selectFilterColumn(index, event.target.value)}
        >
          {filtersState.filters.availableFilterOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </Select>
        <Select
          variant="flushed"
          value={comparison}
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
          onChange={(event) => selectValueFilter(index,event.target.value)}
        ></Input>
      </Stack>
    )
  );
};
