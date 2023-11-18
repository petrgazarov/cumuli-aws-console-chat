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

  const addChannelListener = useCallback((newListener: ListenerFn) => {
    setListener(() => newListener);
  }, []);

  const removeChannelListener = useCallback(() => {
    setListener(null);
  }, []);

  return { postMessage, addChannelListener, removeChannelListener };
};

export default usePort;
