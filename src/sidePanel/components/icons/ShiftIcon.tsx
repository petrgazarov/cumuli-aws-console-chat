import styled from "styled-components";

type ShiftIconProps = {
  style?: React.CSSProperties;
};

const StyledSvg = styled.svg`
  fill: ${({ theme }) => theme.colors.HELP_TEXT};
`;

const ShiftIcon = ({ style }: ShiftIconProps) => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      width="15"
      height="15"
      version="1.1"
      viewBox="0 0 1200 1200"
    >
      <path d="m600 315.6 231.6 277.2h-81.602v325.2h-300v-325.2h-81.602l231.6-277.2m-360 337.2h150v325.2h420v-325.2h150l-360-430.8z" />
    </StyledSvg>
  );
};

export default ShiftIcon;
