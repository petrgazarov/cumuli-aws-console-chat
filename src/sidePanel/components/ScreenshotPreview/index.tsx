import CancelIcon from "sidePanel/components/icons/CancelIcon";

import { CancelIconButton, ScreenshotContainer } from "./styled";

type ScreenshotPreviewProps = {
  url: string;
  onRemove: () => void;
};

const ScreenshotPreview = ({ url, onRemove }: ScreenshotPreviewProps) => {
  return (
    <ScreenshotContainer>
      <img
        src={url}
        style={{ width: "auto", height: "95px" }}
        alt="Screenshot preview"
      />
      <CancelIconButton onClick={onRemove}>
        <CancelIcon width={14} height={14} />
      </CancelIconButton>
    </ScreenshotContainer>
  );
};

export default ScreenshotPreview;
