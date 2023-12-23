import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import useConversations from "sidePanel/hooks/useConversations";
import { currentTabAtom, openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { getOpenaiApiKey } from "utils/helpers";

const useInitialData = () => {
  const [, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const [, setCurrentTab] = useAtom(currentTabAtom);
  const { getConversations } = useConversations();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations();
    getOpenaiApiKey()
      .then((apiKey) => {
        setOpenaiApiKey(apiKey);

        if (!apiKey) {
          setCurrentTab(TabTitlesEnum.config);
        }

        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [setOpenaiApiKey, setCurrentTab, getConversations]);

  return { hasLoaded: !loading };
};

export default useInitialData;
