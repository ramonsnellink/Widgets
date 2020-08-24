import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("Programming");
  const [results, setResults] = useState([]);

  console.log(results);

  useEffect(() => {
    // helper function because you can't use async before the callback function

    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      // Assign the data to results state
      setResults(data.query.search);
    };

    if (term && !results.length) {
      // if there is no result (so first load)
      search();
    } else {
      // Search after 1000ms
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1000);

      // Cleanup function. The next time the users types is resets the timeout.
      // If the user didn't type (and useEffect didn't trigger), 500ms goes by and search is invoked
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term, results.length]);

  const renderedResults = results.map((result) => {
    //remove spans
    const regex = /(<([^>]+)>)/gi;
    const cleanSnippet = result.snippet.replace(regex, "");

    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {cleanSnippet}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input value={term} onChange={(e) => setTerm(e.target.value)} className="input" />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
