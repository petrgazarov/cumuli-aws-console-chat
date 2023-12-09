import CancelIcon from "sidePanel/components/icons/CancelIcon";

import { CancelIconButton, Container, ScreenshotContainer } from "./styled";

type ScreenshotPreviewProps = {
  onRemove: () => void;
  url: string;
};

const ScreenshotPreview = ({ onRemove, url }: ScreenshotPreviewProps) => {
  return (
    <Container>
      <ScreenshotContainer>
        <img
          src={url}
          style={{ height: "95px", width: "auto" }}
          alt="Screenshot preview"
        />
        <CancelIconButton onClick={onRemove} tabIndex={0}>
          <CancelIcon width={14} height={14} />
        </CancelIconButton>
      </ScreenshotContainer>
    </Container>
  );
};

export default ScreenshotPreview;
