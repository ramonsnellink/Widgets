import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    // we set up a helper function, because otherwise we can't use async in useEffect
    const doTranslation = async () => {
      // destructure out data
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: text,
            target: language.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      // 2 times data, because once for the destructure, twice because these is a "data" in the return object as well
      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation(); // don't forget to run the helper function
  }, [language, text]); //re-run on language or text change.

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
