import styled from "styled-components";

const StyledSvg = styled.svg`
  stroke-width: 2px;
  stroke: ${({ theme }) => theme.PRIMARY_TEXT};
`;

type CancelIconProps = {
  height?: number;
  width?: number;
};

const CancelIcon = ({ height = 16, width = 16 }: CancelIconProps) => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      focusable="false"
      width={width}
      height={height}
    >
      <path d="m2 2 12 12M14 2 2 14"></path>
    </StyledSvg>
  );
};

export default CancelIcon;
