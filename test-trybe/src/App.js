import "./App.css";
import Table from "./Table";
import ApiContext from "./context/ContextApi";
import ContextFilter from "./context/FilterContext";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <ApiContext>
        <ContextFilter>
          <Table />
        </ContextFilter>
      </ApiContext>
    </ChakraProvider>
  );
}

export default App;
