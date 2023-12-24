import { useTheme } from "styled-components";

type MacCmdIconProps = {
  style?: React.CSSProperties;
};

const MacCmdIcon = ({ style }: MacCmdIconProps) => {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 1200 1200"
      height="11"
      width="11"
      style={style}
    >
      <g
        fill="none"
        stroke={theme.colors.HELP_TEXT}
        strokeMiterlimit="10"
        strokeWidth="4"
      >
        <path transform="scale(18.75)" d="m24 24h16v16h-16z" />
        <path
          transform="scale(18.75)"
          d="m40 24h8c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8z"
        />
        <path
          transform="scale(18.75)"
          d="m48 56c4.4 0 8-3.6 8-8s-3.6-8-8-8h-8v8c0 4.4 3.6 8 8 8z"
        />
        <path
          transform="scale(18.75)"
          d="m16 56c4.4 0 8-3.6 8-8v-8h-8c-4.4 0-8 3.6-8 8s3.6 8 8 8z"
        />
        <path
          transform="scale(18.75)"
          d="m16 24h8v-8c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8z"
        />
      </g>
    </svg>
  );
};

export default MacCmdIcon;
