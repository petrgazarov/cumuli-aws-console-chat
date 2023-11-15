import { useState, useEffect, useCallback } from "react";

type ListenerFn = (message: any) => void;

const usePort = (channelName: string) => {
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);
  const [listener, setListener] = useState<ListenerFn | null>(null);

  useEffect(() => {
    const newPort = chrome.runtime.connect({ name: channelName });
    setPort(newPort);

    return () => newPort.disconnect();
  }, []);

  useEffect(() => {
    if (!listener || !port) return;

    port.onMessage.addListener(listener);

    return () => port.onMessage.removeListener(listener);
  }, [port, listener]);

  const postMessage = useCallback(
    (message: any) => {
      if (!port) {
        console.warn("Attempted to post message but port is not initialized");
        return;
      }

      port.postMessage(message);
    },
    [port]
  );

  const addMessageListener = useCallback((newListener: ListenerFn) => {
    setListener(() => newListener);
  }, []);

  const removeMessageListener = useCallback(() => {
    setListener(null);
  }, []);

  return { postMessage, addMessageListener, removeMessageListener };
};

export default usePort;
