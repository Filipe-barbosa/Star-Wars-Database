import { Input, Text } from "@chakra-ui/react";
import { useAPI } from "./ContextApi";

export default function SearchFilterName() {
  const { filterName, setFilterName } = useAPI();

  return (
    <>
      <Text mb="8px">Value</Text>
      <Input
        value={filterName}
        onChange={(event) => setFilterName(event.target.value)}
        placeholder="Here is a sample placeholder"
        size="sm"
      />
    </>
  );
}
