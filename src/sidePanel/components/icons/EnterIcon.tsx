import styled from "styled-components";

type EnterIconProps = {
  style?: React.CSSProperties;
};

const StyledSvg = styled.svg`
  fill: ${({ theme }) => theme.colors.HELP_TEXT};
`;

const EnterIcon = ({ style }: EnterIconProps) => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      version="1.1"
      viewBox="0 0 1200 1200"
      style={style}
    >
      <path d="m1e3 350v300c0 13.262-5.2695 25.98-14.645 35.355s-22.094 14.645-35.355 14.645h-629.5l91.5 91.5c9.3125 9.3672 14.539 22.039 14.539 35.25s-5.2266 25.883-14.539 35.25c-9.3672 9.3125-22.039 14.539-35.25 14.539s-25.883-5.2266-35.25-14.539l-177-176.5c-4.5508-4.7539-8.1211-10.363-10.5-16.5-5-12.172-5-25.828 0-38 2.3789-6.1367 5.9492-11.746 10.5-16.5l177-176.5c12.871-11.023 30.453-14.777 46.703-9.9688 16.25 4.8047 28.961 17.516 33.766 33.766 4.8086 16.25 1.0547 33.832-9.9688 46.703l-91.5 91.5h579.5v-250c0-17.863 9.5312-34.371 25-43.301 15.469-8.9336 34.531-8.9336 50 0 15.469 8.9297 25 25.438 25 43.301z" />
    </StyledSvg>
  );
};

export default EnterIcon;
