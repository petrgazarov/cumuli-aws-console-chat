import { useMemo } from "react";

import { getKeyboardShortcutModifierKey } from "utils/helpers";

import { EnterKeyboardSymbol, HelpText, KeyboardSymbol } from "./styled";

export enum UserInstructionType {
  existingMessage = "existingMessage",
  newMessage = "newMessage",
}

type UserInstructionsProps = {
  messageHasImage: boolean;
  messageType: UserInstructionType;
  show: boolean;
};

export const UserInstructions = ({
  messageHasImage,
  messageType,
  show,
}: UserInstructionsProps) => {
  const modifierKey = useMemo(() => getKeyboardShortcutModifierKey(), []);

  if (!show) {
    return null;
  }

  const newInstructions = (
    <>
      <EnterKeyboardSymbol>{"\u23CE"}</EnterKeyboardSymbol> to send,{" "}
      <KeyboardSymbol>{modifierKey} + U</KeyboardSymbol> to send with screenshot
    </>
  );

  const existingInstructions = (
    <>
      <EnterKeyboardSymbol>{"\u23CE"}</EnterKeyboardSymbol> to resend,{" "}
      <KeyboardSymbol>{modifierKey} + U</KeyboardSymbol> to resend with{" "}
      {messageHasImage ? "new " : ""}
      screenshot
    </>
  );

  return (
    <HelpText onMouseDown={(e) => e.preventDefault()}>
      {messageType === UserInstructionType.newMessage
        ? newInstructions
        : existingInstructions}
    </HelpText>
  );
};
