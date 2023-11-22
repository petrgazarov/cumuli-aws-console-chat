import { ScreenshotContainer, CancelIconButton } from "./styled";

import CancelIcon from "content/components/icons/CancelIcon";

type ScreenshotPreviewProps = {
  url: string;
  onRemove?: () => void;
};

const ScreenshotPreview = ({ url, onRemove }: ScreenshotPreviewProps) => {
  return (
    <ScreenshotContainer>
      <img
        src={url}
        style={{ width: "auto", height: "75px" }}
        alt="Screenshot preview"
      />
      <CancelIconButton onClick={() => onRemove?.()}>
        <CancelIcon width={12} height={12} />
      </CancelIconButton>
    </ScreenshotContainer>
  );
};

export default ScreenshotPreview;
