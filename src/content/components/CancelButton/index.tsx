import { ButtonComponent, SvgIcon } from "./styled";

type CancelButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  width?: string;
  height?: string;
};

const CancelButton = ({
  onClick,
  width = "16",
  height = "16",
}: CancelButtonProps) => {
  return (
    <ButtonComponent onClick={onClick}>
      <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        focusable="false"
        width={width}
        height={height}
      >
        <path d="m2 2 12 12M14 2 2 14"></path>
      </SvgIcon>
    </ButtonComponent>
  );
};

export default CancelButton;
