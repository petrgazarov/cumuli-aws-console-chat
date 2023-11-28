import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import Button from "sidePanel/components/Button";
import TextInput from "sidePanel/components/TextInput";
import { currentTabAtom, openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { getOpenaiApiKey, saveOpenaiApiKey } from "utils/helpers";

import {
  ConfigTabContent,
  SubmitApiKeyButtonContainer,
  TextInputRow,
} from "./styled";

const ConfigTab = () => {
  const [currentTab] = useAtom(currentTabAtom);
  const [openaiApiKey, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const [inputValue, setInputValue] = useState("");
  const [showSavedStatus, setShowSavedStatus] = useState(true);
  const [inputDirty, setInputDirty] = useState(false);

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
      setShowSavedStatus(true);
    });
  }, [inputValue]);

  const buttonDisabled = !inputValue || inputValue === openaiApiKey;

  const showContent = currentTab === TabTitlesEnum.config;

  useEffect(() => {
    if (showContent) {
      setInputValue(openaiApiKey);
    }
  }, [showContent]);

  return (
    <ConfigTabContent $show={showContent}>
      <TextInputRow>
        <TextInput
          label="OpenAI API Key"
          value={inputValue}
          onChange={(value) => {
            setShowSavedStatus(false);
            setInputValue(value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace" && !inputDirty) {
              setInputDirty(true);
            }
          }}
          placeholder="Enter OpenAI API Key"
          showSavedStatus={showSavedStatus}
        />
        <SubmitApiKeyButtonContainer>
          <Button onClick={saveApiKey} disabled={buttonDisabled}>
            Submit
          </Button>
        </SubmitApiKeyButtonContainer>
      </TextInputRow>
    </ConfigTabContent>
  );
};

export default ConfigTab;
