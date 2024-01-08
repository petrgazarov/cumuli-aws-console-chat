import ApiKeySection from "./ApiKeySection";
import ChangeKeyboardShortcutsSection from "./ChangeKeyboardShortcutsSection";
import ClearDataSection from "./ClearDataSection";
import Footer from "./Footer";
import { ConfigTabContent } from "./styled";

const ConfigTab = () => {
  return (
    <ConfigTabContent>
      <ApiKeySection />
      <ChangeKeyboardShortcutsSection />
      <ClearDataSection />
      <Footer />
    </ConfigTabContent>
  );
};

export default ConfigTab;
