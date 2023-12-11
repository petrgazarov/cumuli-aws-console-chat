import CancelIcon from "sidePanel/components/icons/CancelIcon";

import {
  CancelIconButton,
  Container,
  ScreenshotContainer,
  ScreenshotImage,
} from "./styled";

type ScreenshotPreviewProps = {
  onRemove: () => void;
  url: string;
};

const ScreenshotPreview = ({ onRemove, url }: ScreenshotPreviewProps) => {
  return (
    <Container>
      <ScreenshotContainer>
        {url ? (
          <ScreenshotImage src={url} alt="Screenshot preview" />
        ) : (
          <ScreenshotImage as="div" />
        )}
        <CancelIconButton onClick={onRemove} tabIndex={0}>
          <CancelIcon width={14} height={14} />
        </CancelIconButton>
      </ScreenshotContainer>
    </Container>
  );
};

export default ScreenshotPreview;
