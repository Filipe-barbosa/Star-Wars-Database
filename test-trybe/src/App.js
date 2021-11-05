import "./App.css";
import Filter from "./filter";
import FetchApi from "./contextApi";

function App() {
  return (
    <h1>
      <FetchApi>
        <Filter />
      </FetchApi>
    </h1>
  );
}

export default App;
