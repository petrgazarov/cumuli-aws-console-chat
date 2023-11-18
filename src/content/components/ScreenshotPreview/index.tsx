import CancelButton from "content/components/CancelButton";
import { ScreenshotContainer, CancelIconContainer } from "./styled";

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
      <CancelIconContainer>
        <CancelButton onClick={() => onRemove?.()} width="12" height="12" />
      </CancelIconContainer>
    </ScreenshotContainer>
  );
};

export default ScreenshotPreview;
