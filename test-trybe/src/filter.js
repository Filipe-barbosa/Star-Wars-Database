import React from "react";
import { useAPI } from "./contextApi";

const Filter = () => {
  const { isLoading, data } = useAPI();
  console.log(data)
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data.map((data) => {
        return <p>{data.name}</p>;
      })}
    </div>
  );
};

export default Filter;
