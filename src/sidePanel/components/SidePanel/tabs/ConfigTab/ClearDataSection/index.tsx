import { useMemo, useState } from "react";

import useConversations from "sidePanel/hooks/useConversations";

import {
  ButtonLabel,
  ButtonsContainer,
  CancelButton,
  ClearDataButton,
  ConfirmButton,
  SectionContainer,
} from "./styled";

enum SectionState {
  after_delete = "after_delete",
  confirm_deletion = "confirm_deletion",
  default = "default",
}

const ClearDataSection = () => {
  const [sectionState, setSectionState] = useState<SectionState>(
    SectionState.default
  );
  const { deleteAllConversations } = useConversations();

  const labelText =
    sectionState === SectionState.confirm_deletion
      ? "Are you sure? This cannot be undone"
      : "Conversations are stored locally in your browser";

  const buttonsContent = useMemo(() => {
    switch (sectionState) {
      case SectionState.confirm_deletion:
        return (
          <>
            <ConfirmButton
              onClick={() => {
                setSectionState(SectionState.after_delete);
                deleteAllConversations();
              }}
            >
              Clear all
            </ConfirmButton>
            <CancelButton onClick={() => setSectionState(SectionState.default)}>
              Cancel
            </CancelButton>
          </>
        );
      case SectionState.after_delete:
        return (
          <ClearDataButton disabled>Cleared</ClearDataButton>
        );
      default:
        return (
          <ClearDataButton
            onClick={() => setSectionState(SectionState.confirm_deletion)}
          >
            Clear all conversations
          </ClearDataButton>
        );
    }
  }, [sectionState, setSectionState, deleteAllConversations]);

  return (
    <SectionContainer>
      <ButtonLabel>{labelText}</ButtonLabel>
      <ButtonsContainer>{buttonsContent}</ButtonsContainer>
    </SectionContainer>
  );
};

export default ClearDataSection;
