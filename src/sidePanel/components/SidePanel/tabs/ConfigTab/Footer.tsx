import packageJson from "root/package.json";
import { SOURCE_CODE_URL } from "sidePanel/utils/constants";

import { SourceCodeLink, StyledFooter } from "./styled";

const Footer = () => {
  return (
    <StyledFooter>
      {`v${packageJson.version}`}
      <SourceCodeLink
        href={SOURCE_CODE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        source
      </SourceCodeLink>
    </StyledFooter>
  );
};

export default Footer;
