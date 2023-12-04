import { useCallback, useEffect, useState } from "react";

import {
  addPortMessageListener,
  createPort,
  removePort,
  removePortMessageListener,
} from "sidePanel/utils/listeners";

type usePortParameters = {
  channelName: string;
  listener?: (message: any) => void;
};

type PortBuffer = {
  listener?: (message: any) => void;
  pendingMessage: any;
  resetPortPending: boolean;
};

const usePort = ({ channelName, listener }: usePortParameters) => {
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  // port buffer is so that an unsent message can be sent after the port is reset.
  const [portBuffer, setPortBuffer] = useState<PortBuffer>({
    listener,
    pendingMessage: null,
    resetPortPending: true,
  });

  useEffect(() => {
    // Only run this effect when portBuffer.resetPortPending is flipped to true.
    if (!portBuffer.resetPortPending) {
      return;
    }

    const newPort = createPort(channelName);

    if (portBuffer.listener) {
      addPortMessageListener(newPort, portBuffer.listener);
    }
    if (portBuffer.pendingMessage) {
      newPort.postMessage(portBuffer.pendingMessage);
    }

    setPortBuffer((prevBuffer) => ({
      ...prevBuffer,
      pendingMessage: null,
      resetPortPending: false,
    }));
    setPort(newPort);

    return () => {
      // Since portBuffer.resetPortPending is flipped to false immediately in the effect,
      // this cleanup function will only run when the last value of portBuffer.resetPortPending
      // was false.
      if (portBuffer.resetPortPending) {
        return;
      }

      // port should never be null here, this is just to satisfy TS.
      if (!port) {
        return;
      }

      // the new port will be set in the effect immediately after this cleanup function runs.
      if (portBuffer.listener) {
        removePortMessageListener(port, portBuffer.listener);
      }
      removePort(port);
    };
  }, [channelName, portBuffer, port]);

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
      } catch (e: any) {
        // Service worker can be terminated at any time, this handles port reset in that case.
        console.debug("[Cumuli] Failed to post message to port: ", e?.message);

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
