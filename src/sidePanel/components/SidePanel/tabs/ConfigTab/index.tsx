import { useAtom } from "jotai";
import { useCallback, useState } from "react";

import Button from "sidePanel/components/Button";
import TextInput from "sidePanel/components/TextInput";
import { openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { saveOpenaiApiKey } from "utils/helpers";

import {
  ConfigTabContent,
  SubmitApiKeyButtonContainer,
  TextInputRow,
} from "./styled";

const ConfigTab = () => {
  const [openaiApiKey, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const [inputValue, setInputValue] = useState(openaiApiKey);
  const [showSavedStatus, setShowSavedStatus] = useState(true);
  const [inputDirty, setInputDirty] = useState(false);

  const saveApiKey = useCallback(() => {
    saveOpenaiApiKey(inputValue).then((maskedKey) => {
      setInputValue(maskedKey);
      setOpenaiApiKey(maskedKey);
      setShowSavedStatus(true);
    });
  }, [inputValue]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (inputDirty) {
        return;
      }

      e.preventDefault();

      if (e.key === "Backspace") {
        setInputValue("");
        setShowSavedStatus(false);
        setInputDirty(true);
      }
    },
    [inputDirty]
  );

  const onChange = useCallback(
    (value: string) => {
      if (!inputDirty) {
        return;
      }

      setShowSavedStatus(false);
      setInputValue(value);
    },
    [inputDirty]
  );

  const buttonDisabled = !inputValue || inputValue === openaiApiKey;

  return (
    <ConfigTabContent>
      <TextInputRow>
        <TextInput
          label="OpenAI API Key"
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
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
