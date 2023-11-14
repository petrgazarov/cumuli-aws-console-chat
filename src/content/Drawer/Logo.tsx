import { LogoContainer } from "./styled";

const Logo = () => {
  const imageUrl = chrome.runtime.getURL("/icons/logo48.png");

  return (
    <LogoContainer>
      <img src={imageUrl} width={22} height={22} alt="Cumuli logo" />
    </LogoContainer>
  );
};

export default Logo;
