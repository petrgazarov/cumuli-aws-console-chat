import { LogoContainer, LogoImage } from "./styled";

const Logo = () => {
  const imageUrl = chrome.runtime.getURL("/icons/logo48.png");

  return (
    <LogoContainer>
      <LogoImage src={imageUrl} width={22} height={22} alt="Cumuli logo" />
    </LogoContainer>
  );
};

export default Logo;
