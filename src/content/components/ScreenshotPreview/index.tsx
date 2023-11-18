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
        <CancelButton width="12" height="12" onClick={() => onRemove?.()} />
      </CancelIconContainer>
    </ScreenshotContainer>
  );
};

export default ScreenshotPreview;
