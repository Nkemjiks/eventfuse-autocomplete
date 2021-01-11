import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [searchWord, setSearchWord] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios({
        method: "get",
        url:
          "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete",
        params: { text: searchWord },
        headers: {
          "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_HOST}`,
          "x-rapidapi-host": `${process.env.REACT_APP_RAPID_API_KEY}`,
          useQueryString: true,
        },
      });

      if (res.data.length > 0) {
        setQueryResults(res.data);
      } else {
        setQueryResults([]);
        console.log("Sorry, no result marches your enquiry..");
      }
    };
    getData();
  }, [searchWord]);

  const handleOnchange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className="App">
      <input
        type="text"
        name="search"
        value={searchWord}
        onChange={handleOnchange}
      />
      {queryResults.length > 0 &&
        queryResults.map((data, i) => <p key={i}>{data}</p>)}
    </div>
  );
};

export default App;
