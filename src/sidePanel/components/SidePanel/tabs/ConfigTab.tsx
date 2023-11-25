import { useAtom } from "jotai";
import { useState, useEffect, useCallback } from "react";

import Button from "sidePanel/components/Button";
import TextInput from "sidePanel/components/TextInput";
import { currentTabAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { getOpenAiApiKey, setOpenAiApiKey } from "utils/helpers";

import { ConfigTabContent, SubmitApiKeyButtonContainer } from "./styled";

const ConfigTab = () => {
  const [currentTab] = useAtom(currentTabAtom);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getOpenAiApiKey().then((apiKey) => setInputValue(apiKey));
  }, []);

  const saveApiKey = useCallback(() => {
    setOpenAiApiKey(inputValue).then(() => setMessage("Saved!"));
  }, [inputValue]);

  return (
    <ConfigTabContent show={currentTab == TabTitlesEnum.config}>
      <TextInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter OpenAI API Key"
      />
      <SubmitApiKeyButtonContainer>
        <Button onClick={saveApiKey}>Submit</Button>
      </SubmitApiKeyButtonContainer>
      <p>{message}</p>
    </ConfigTabContent>
  );
};

export default ConfigTab;
