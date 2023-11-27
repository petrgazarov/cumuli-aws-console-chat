import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import Button from "sidePanel/components/Button";
import TextInput from "sidePanel/components/TextInput";
import { currentTabAtom, openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { getOpenaiApiKey, saveOpenaiApiKey } from "utils/helpers";

import { ConfigTabContent, SubmitApiKeyButtonContainer } from "./styled";

const ConfigTab = () => {
  const [currentTab] = useAtom(currentTabAtom);
  const [openaiApiKey, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getOpenaiApiKey().then((apiKey: string) => {
      setInputValue(apiKey);
      setOpenaiApiKey(apiKey);
    });
  }, []);

  const saveApiKey = useCallback(() => {
    saveOpenaiApiKey(inputValue).then((maskedKey) => {
      setInputValue(maskedKey);
      setOpenaiApiKey(maskedKey);
      setMessage("Saved!");
    });
  }, [inputValue]);

  const buttonDisabled = !inputValue || inputValue === openaiApiKey;

  return (
    <ConfigTabContent $show={currentTab == TabTitlesEnum.config}>
      <TextInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter OpenAI API Key"
      />
      <SubmitApiKeyButtonContainer>
        <Button onClick={saveApiKey} disabled={buttonDisabled}>
          Submit
        </Button>
      </SubmitApiKeyButtonContainer>
      <p>{message}</p>
    </ConfigTabContent>
  );
};

export default ConfigTab;
