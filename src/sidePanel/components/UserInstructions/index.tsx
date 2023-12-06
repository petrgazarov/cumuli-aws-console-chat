import { useMemo } from "react";

import { getKeyboardShortcutModifierKey } from "utils/helpers";

import { HelpText, KeyboardSymbol } from "./styled";

export enum UserInstructionType {
  existingMessage = "existingMessage",
  newMessage = "newMessage",
}

export const UserInstructions = ({
  messageType,
}: {
  messageType: UserInstructionType;
}) => {
  const modifierKey = useMemo(() => getKeyboardShortcutModifierKey(), []);

  const newInstructions = (
    <>
      <KeyboardSymbol style={{ fontSize: "11px" }}>{"\u23CE"}</KeyboardSymbol>{" "}
      to send, <KeyboardSymbol>{modifierKey} + U</KeyboardSymbol> to send with
      screenshot
    </>
  );

  const existingInstructions = (
    <>
      <KeyboardSymbol style={{ fontSize: "11px" }}>{"\u23CE"}</KeyboardSymbol>{" "}
      to resend, <KeyboardSymbol>{modifierKey} + U</KeyboardSymbol> to resend
      with new screenshot
    </>
  );

  return (
    <HelpText>
      {messageType === UserInstructionType.newMessage
        ? newInstructions
        : existingInstructions}
    </HelpText>
  );
};
