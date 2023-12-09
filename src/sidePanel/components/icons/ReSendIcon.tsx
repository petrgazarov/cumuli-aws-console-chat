import styled from "styled-components";

type ReSendIconProps = {
  height?: number;
  width?: number;
};

const StyledSvg = styled.svg`
  fill: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const ReSendIcon = ({ height = 18, width = 18 }: ReSendIconProps) => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="468 449.99 264 306.02"
      height={height}
      width={width}
    >
      <path d="m673.21 514.14c-21.301-14.219-46.613-22.137-73.207-22.137-72.902 0-132 59.098-132 132s59.098 132 132 132 132-59.098 132-132h-24c0 59.648-48.352 108-108 108s-108-48.352-108-108 48.352-108 108-108c25.738 0 49.984 9.0508 69.094 24.98l-71.41 19.137 6.2109 23.18 105.14-28.172-28.176-105.14-23.18 6.2109z" />
    </StyledSvg>
  );
};

export default ReSendIcon;
