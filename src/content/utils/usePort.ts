import { useState, useEffect, useCallback } from "react";

type usePortParameters = {
  channelName: string;
  listener?: (message: any) => void;
};

type PortBuffer = {
  resetPortPending: boolean;
  pendingMessage: any;
  listener?: (message: any) => void;
};

const usePort = ({ channelName, listener }: usePortParameters) => {
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  // port buffer is so that an unsent message can be sent after the port is reset.
  const [portBuffer, setPortBuffer] = useState<PortBuffer>({
    resetPortPending: true,
    pendingMessage: null,
    listener,
  });

  useEffect(() => {
    // Only run this effect when portBuffer.resetPortPending is flipped to true.
    if (!portBuffer.resetPortPending) return;

    const newPort = chrome.runtime.connect({ name: channelName });

    if (portBuffer.listener) {
      newPort.onMessage.addListener(portBuffer.listener);
    }
    if (portBuffer.pendingMessage) {
      newPort.postMessage(portBuffer.pendingMessage);
    }

    setPortBuffer((prevBuffer) => ({
      ...prevBuffer,
      resetPortPending: false,
      pendingMessage: null,
    }));
    setPort(newPort);

    return () => {
      // Since portBuffer.resetPortPending is flipped to false immediately in the effect,
      // this cleanup function will only run when the last value of portBuffer.resetPortPending
      // was false.
      if (portBuffer.resetPortPending) return;

      // port should never be null here, this is just to satisfy TS.
      if (!port) return;

      // the new port will be set in the effect immediately after this cleanup function runs.
      if (portBuffer.listener) {
        port.onMessage.removeListener(portBuffer.listener);
      }
      port.disconnect();
    };
  }, [portBuffer.resetPortPending]);

  useEffect(() => {
    if (!port) return;

    if (listener) {
      port.onMessage.addListener(listener);
    }

    setPortBuffer((prevBuffer) => ({
      ...prevBuffer,
      listener,
    }));

    return () => {
      if (!port) return;
      if (portBuffer.listener) {
        port.onMessage.removeListener(portBuffer.listener);
      }
    };
  }, [listener]);

  const postMessage = useCallback(
    (message: any) => {
      try {
        if (!port) {
          // This can only ever happen because of a race condition, but is very unlikely.
          console.error(
            "Attempted to post message but port is not initialized"
          );
          return;
        }
        port.postMessage(message);
      } catch (e) {
        // Service worker can be terminated at any time, this handles port reset in that case.
        console.warn("Failed to post message to port", e);

        setPortBuffer((prevBuffer) => ({
          ...prevBuffer,
          pendingMessage: message,
          resetPortPending: true,
        }));
      }
    },
    [port]
  );

  return { postMessage };
};

export default usePort;
