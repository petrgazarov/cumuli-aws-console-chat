import { useAtom } from "jotai";
import { useCallback, useRef, useState } from "react";

import { Button } from "sidePanel/components/Button";
import TextInput from "sidePanel/components/TextInput";
import { openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { getAllModifierKeys, saveOpenaiApiKey } from "utils/helpers";

import ClearDataSection from "./ClearDataSection";
import {
  ApiKeySection,
  ConfigTabContent,
  SubmitApiKeyButtonContainer,
} from "./styled";

const ConfigTab = () => {
  const [openaiApiKey, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const [inputValue, setInputValue] = useState(openaiApiKey);
  const textInputRef = useRef<HTMLInputElement>(null);

  const saveApiKey = useCallback(() => {
    const value = textInputRef.current?.value || "";

    saveOpenaiApiKey(value.trim()).then((maskedKey) => {
      setInputValue(maskedKey);
      setOpenaiApiKey(maskedKey);
    });
  }, [setInputValue, setOpenaiApiKey]);

  const inputMasked = inputValue.includes("...") && inputValue === openaiApiKey;

  const isApiKeySubmitDisabled = useCallback(
    () => inputMasked || inputValue === openaiApiKey,
    [openaiApiKey, inputMasked, inputValue]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isApiKeySubmitDisabled()) {
        e.preventDefault();
        saveApiKey();
      }

      if (inputMasked && !getAllModifierKeys().includes(e.key)) {
        setInputValue("");
      }
    },
    [isApiKeySubmitDisabled, inputMasked, saveApiKey]
  );

  const onChange = useCallback((value: string) => setInputValue(value), []);

  return (
    <ConfigTabContent>
      <ApiKeySection>
        <TextInput
          label="OpenAI API Key"
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Enter OpenAI API Key"
          showSavedStatus={inputValue === openaiApiKey}
          textInputRef={textInputRef}
        />
        <SubmitApiKeyButtonContainer>
          <Button onClick={saveApiKey} disabled={isApiKeySubmitDisabled()}>
            Submit
          </Button>
        </SubmitApiKeyButtonContainer>
      </ApiKeySection>
      <ClearDataSection />
    </ConfigTabContent>
  );
};

export default ConfigTab;