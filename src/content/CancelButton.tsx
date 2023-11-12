import styled from "styled-components";

type CancelButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

const ButtonComponent = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: none;

  &hover {
    color: #fff;
  }
`;

const SvgIcon = styled.svg`
  stroke-width: 2px;
  width: 16px;
  height: 16px;
  stroke: #d5dbdb;

  &:hover {
    stroke: #fff;
  }
`;

const CancelButton = (props: CancelButtonProps) => {
  return (
    <ButtonComponent onClick={props.onClick}>
      <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        focusable="false"
      >
        <path d="m2 2 12 12M14 2 2 14"></path>
      </SvgIcon>
    </ButtonComponent>
  );
};

export default CancelButton;
