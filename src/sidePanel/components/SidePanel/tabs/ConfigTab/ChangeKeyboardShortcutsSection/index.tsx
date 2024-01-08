import { ButtonLabel, ChangeShortcutsButton, SectionContainer } from "./styled";

const ChangeKeyboardShortcutsSection = () => {
  return (
    <SectionContainer>
      <ButtonLabel>
        Keyboard shortcuts are customizable in the extension settings
      </ButtonLabel>
      <ChangeShortcutsButton
        onClick={() =>
          chrome.tabs.create({ url: "chrome://extensions/shortcuts" })
        }
      >
        Change keyboard shortcuts
      </ChangeShortcutsButton>
    </SectionContainer>
  );
};

export default ChangeKeyboardShortcutsSection;
