import { useAtom } from "jotai";
import { useCallback, useRef, useState } from "react";

import { Button } from "sidePanel/components/Button";
import TextInput from "sidePanel/components/TextInput";
import { openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { getAllNonCharacterKeys, saveOpenaiApiKey } from "utils/helpers";

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

      const characterKeyPressed =
        !getAllNonCharacterKeys().includes(e.key) && !e.ctrlKey && !e.metaKey;

      if (inputMasked && characterKeyPressed) {
        try {
          /* document.execCommand is used to allow the built-in "undo" action to revert this input change.
           * It is deprecated, but works for now. Might need to replaced in the future. */
          textInputRef.current?.focus();
          textInputRef.current?.select();
          document.execCommand("delete");
        } catch (err) {
          console.debug(
            "[Cumuli] Failed to call document.execCommand('delete') on the input"
          );
          setInputValue("");
        }
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
