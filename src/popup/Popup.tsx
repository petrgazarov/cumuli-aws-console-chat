import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import { getOpenAiApiKey, setOpenAiApiKey } from "utils/helpers";

const Popup = () => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getOpenAiApiKey().then((apiKey) => setInputValue(apiKey));
  }, []);

  const saveApiKey = useCallback(() => {
    setOpenAiApiKey(inputValue).then(() => setMessage("Saved!"));
  }, [inputValue]);

  return (
    <div>
      <h1>Cumuli AWS extension</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter OpenAI API Key"
      />
      <button onClick={saveApiKey}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
