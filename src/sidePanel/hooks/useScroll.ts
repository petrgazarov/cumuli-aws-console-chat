import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  documentHadAnyScrollAtom,
  documentHadScrollToBottomAtom,
  scrollableContainerRefAtom,
} from "sidePanel/utils/atoms";

type UseScrollParams = {
  isLoading: boolean;
};

const useScroll = ({ isLoading }: UseScrollParams) => {
  const [scrollableContainerRef] = useAtom(scrollableContainerRefAtom);
  const [, setDocumentHadAnyScroll] = useAtom(documentHadAnyScrollAtom);
  const [, setDocumentHadScrollToBottom] = useAtom(
    documentHadScrollToBottomAtom
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const currentScrollableContainer = scrollableContainerRef.current;

    const handleScroll = () => {
      setDocumentHadAnyScroll(true);

      // Check if scrolled to bottom
      if (currentScrollableContainer) {
        const isScrolledToBottom =
          currentScrollableContainer.scrollHeight -
            currentScrollableContainer.scrollTop ===
          currentScrollableContainer.clientHeight;

        if (isScrolledToBottom) {
          setDocumentHadScrollToBottom(isScrolledToBottom);
        }
      }
    };

    currentScrollableContainer?.addEventListener("scroll", handleScroll);

    return () => {
      if (isLoading) {
        return;
      }
      currentScrollableContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [
    setDocumentHadAnyScroll,
    setDocumentHadScrollToBottom,
    scrollableContainerRef,
    isLoading,
  ]);
};

export default useScroll;
