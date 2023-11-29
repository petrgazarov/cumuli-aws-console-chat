import { useAtom } from "jotai";
import { useCallback, useRef, useState } from "react";

import Button from "sidePanel/components/Button";
import { ButtonVariants } from "sidePanel/components/Button/types";
import TextInput from "sidePanel/components/TextInput";
import useConversations from "sidePanel/hooks/useConversations";
import { openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { getAllModifierKeys, saveOpenaiApiKey } from "utils/helpers";

import {
  ClearDataButtonLabel,
  ClearDataRow,
  ConfigTabContent,
  SubmitApiKeyButtonContainer,
  TextInputRow,
} from "./styled";

const ConfigTab = () => {
  const [openaiApiKey, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const [inputValue, setInputValue] = useState(openaiApiKey);
  const { deleteAllConversations } = useConversations();
  const textInputRef = useRef<HTMLInputElement>(null);

  const saveApiKey = useCallback(() => {
    const value = textInputRef.current?.value || "";

    saveOpenaiApiKey(value).then((maskedKey) => {
      setInputValue(maskedKey);
      setOpenaiApiKey(maskedKey);
    });
  }, []);

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
    [isApiKeySubmitDisabled, inputMasked]
  );

  const onChange = useCallback(
    (value: string) => setInputValue(value),
    [inputMasked]
  );

  return (
    <ConfigTabContent>
      <TextInputRow>
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
      </TextInputRow>
      <ClearDataRow>
        <ClearDataButtonLabel>
          Your conversations are stored locally in IndexedDB
        </ClearDataButtonLabel>
        <Button
          onClick={deleteAllConversations}
          variant={ButtonVariants.primary}
        >
          Clear all data
        </Button>
      </ClearDataRow>
    </ConfigTabContent>
  );
};

export default ConfigTab;
