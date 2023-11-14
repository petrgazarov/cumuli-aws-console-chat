import { useState, useEffect, useCallback } from "react";

type ListenerFn = (message: any) => void;

const usePort = (channelName: string) => {
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  useEffect(() => {
    const newPort = chrome.runtime.connect({ name: channelName });
    setPort(newPort);

    return () => newPort.disconnect();
  }, [channelName]);

  const postMessage = useCallback(
    (message: any) => {
      if (port) {
        port.postMessage(message);
      }
    },
    [port]
  );

  const addMessageListener = useCallback(
    (listener: ListenerFn) => {
      if (port) {
        port.onMessage.addListener(listener);
      }
    },
    [port]
  );

  const removeMessageListener = useCallback(
    (listener: ListenerFn) => {
      if (port) {
        port.onMessage.removeListener(listener);
      }
    },
    [port]
  );

  return { postMessage, addMessageListener, removeMessageListener };
};

export default usePort;
