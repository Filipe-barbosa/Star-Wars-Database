import "./App.css";
import Table from "./Table";
import FetchApi from "./ContextApi";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <FetchApi>
        <Table />
      </FetchApi>
    </ChakraProvider>
  );
}

export default App;
