import { useMemo } from "react";

import EnterIcon from "sidePanel/components/icons/EnterIcon";
import MacCmdIcon from "sidePanel/components/icons/MacCmdIcon";
import ShiftIcon from "sidePanel/components/icons/ShiftIcon";
import { detectOS } from "sidePanel/utils/helpers";
import { OS } from "sidePanel/utils/types";

import { HelpText, KeySymbol } from "./styled";

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

  const modifierIcons = useMemo(() => {
    if (os === OS.MacOS) {
      return (
        <>
          <ShiftIcon style={{ marginBottom: "2px", verticalAlign: "middle" }} />
          {" + "}
          <MacCmdIcon
            style={{ marginBottom: "2px", verticalAlign: "middle" }}
          />
        </>
      );
    }

    return (
      <>
        <ShiftIcon style={{ marginBottom: "2px", verticalAlign: "middle" }} />
        {" + "}
        <KeySymbol>Ctrl</KeySymbol>
      </>
    );
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
      {enterIcon} to send, {modifierIcons}
      {" + "}
      <KeySymbol>I</KeySymbol> to send with screenshot
    </>
  );

  const existingInstructions = (
    <>
      {enterIcon} to resend, {modifierIcons}
      {" + "}
      <KeySymbol>I</KeySymbol> to resend with {messageHasImage ? "new " : ""}
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
