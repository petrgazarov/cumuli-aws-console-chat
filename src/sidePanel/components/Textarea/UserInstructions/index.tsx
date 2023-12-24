import { useMemo } from "react";

import EnterIcon from "sidePanel/components/icons/EnterIcon";
import MacCmdIcon from "sidePanel/components/icons/MacCmdIcon";
import { detectOS } from "sidePanel/utils/helpers";
import { OS } from "sidePanel/utils/types";

import { HelpText, KeySymbol, SpecialKeySymbol } from "./styled";

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
  const os = detectOS();

  const modifierIcon = useMemo(() => {
    if (os === OS.MacOS) {
      return <MacCmdIcon style={{ verticalAlign: "middle" }} />;
    }

    return "Ctrl";
  }, [os]);

  const enterIcon = useMemo(
    () => <EnterIcon style={{ verticalAlign: "middle" }} />,
    []
  );

  if (!show) {
    return null;
  }

  const newInstructions = (
    <>
      <SpecialKeySymbol>{enterIcon}</SpecialKeySymbol> to send,{" "}
      <SpecialKeySymbol>{modifierIcon}</SpecialKeySymbol>
      <KeySymbol> + I</KeySymbol> to send with screenshot
    </>
  );

  const existingInstructions = (
    <>
      <SpecialKeySymbol>{enterIcon}</SpecialKeySymbol> to resend,{" "}
      <SpecialKeySymbol>{modifierIcon}</SpecialKeySymbol>
      <KeySymbol> + I</KeySymbol> to resend with {messageHasImage ? "new " : ""}
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
