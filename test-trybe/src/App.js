import "./App.css";
import Table from "./components/Table";
import ApiContext from "./context/ApiContext";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <ApiContext>
        <Table />
      </ApiContext>
    </ChakraProvider>
  );
}

export default App;
