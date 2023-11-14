import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["apiKey"], function (result) {
      setApiKey(result.apiKey || "");
    });
  }, []);

  const saveApiKey = () => {
    chrome.storage.local.set({ apiKey: apiKey }, function () {
      setMessage("Saved!");
    });
  };

  return (
    <div>
      <h1>Cumuli AWS extension</h1>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter OpenAI API Key"
      />
      <button onClick={saveApiKey}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
