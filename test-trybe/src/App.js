import "./App.css";
import GenerateTable from "./Table";
import FetchApi from "./ContextApi";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <FetchApi>
        <GenerateTable />
      </FetchApi>
    </ChakraProvider>
  );
}

export default App;
