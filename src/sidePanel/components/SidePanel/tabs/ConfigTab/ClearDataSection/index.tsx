import { useState } from "react";

import useConversations from "sidePanel/hooks/useConversations";

import {
  ButtonLabel,
  ButtonsContainer,
  CancelButton,
  ClearDataButton,
  ConfirmButton,
  SectionContainer,
} from "./styled";

const ClearDataSection = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { deleteAllConversations } = useConversations();

  return (
    <SectionContainer>
      <ButtonLabel>
        {showConfirmation
          ? "Are you sure? This action cannot be reversed"
          : "Conversations are stored locally in IndexedDB"}
      </ButtonLabel>
      <ButtonsContainer>
        {!showConfirmation && (
          <ClearDataButton onClick={() => setShowConfirmation(true)}>
            Clear all conversations
          </ClearDataButton>
        )}
        {showConfirmation && (
          <>
            <ConfirmButton
              onClick={() => {
                setShowConfirmation(false);
                deleteAllConversations();
              }}
            >
              Clear all
            </ConfirmButton>
            <CancelButton onClick={() => setShowConfirmation(false)}>
              Cancel
            </CancelButton>
          </>
        )}
      </ButtonsContainer>
    </SectionContainer>
  );
};

export default ClearDataSection;
