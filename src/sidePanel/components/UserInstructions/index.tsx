import { useMemo } from "react";

import { getKeyboardShortcutModifierKey } from "utils/helpers";

import { HelpText, KeyboardSymbol } from "./styled";

const UserInstructions = () => {
  const modifierKey = useMemo(() => getKeyboardShortcutModifierKey(), []);

  return (
    <HelpText>
      <KeyboardSymbol style={{ fontSize: "11px" }}>{"\u23CE"}</KeyboardSymbol>{" "}
      to send, <KeyboardSymbol>{modifierKey} + U</KeyboardSymbol> to send with
      screenshot
    </HelpText>
  );
};

export default UserInstructions;
