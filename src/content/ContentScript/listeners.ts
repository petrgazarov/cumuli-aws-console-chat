type ListenerFn = (message: any) => void;

type SavedListeners = {
  window: Array<{ type: string; func: ListenerFn }>;
  runtimeMessage: Array<ListenerFn>;
  portMessage: Array<{
    port: chrome.runtime.Port;
    listener: ListenerFn;
  }>;
  port: Array<chrome.runtime.Port>;
};

// React app can be forcefully removed by AWS UI re-renders. Keep track of listeners
// so they can be properly removed.
export const savedListeners: SavedListeners = {
  window: [],
  runtimeMessage: [],
  portMessage: [],
  port: [],
};

export const clearAllListeners = () => {
  // Listeners added with `window.addEventListener`
  savedListeners.window.forEach((listenerObject) => {
    window.removeEventListener(listenerObject.type, listenerObject.func);
  });
  savedListeners.window = [];

  // Listeners added with `chrome.runtime.onMessage.addListener`
  savedListeners.runtimeMessage.forEach((listener) => {
    chrome.runtime.onMessage.removeListener(listener);
  });
  savedListeners.runtimeMessage = [];

  // Listeners added with `port.onMessage.addListener`
  savedListeners.portMessage.forEach((listenerObject) => {
    listenerObject.port.onMessage.removeListener(listenerObject.listener);
  });
  savedListeners.portMessage = [];

  // Ports created with chrome.runtime.connect
  savedListeners.port.forEach((port) => {
    port.disconnect();
  });
  savedListeners.port = [];
};

export const addWindowListener = (type: string, listener: ListenerFn) => {
  window.addEventListener(type, listener);
  savedListeners.window.push({ type, func: listener });
};

export const removeWindowListener = (type: string, listener: ListenerFn) => {
  window.removeEventListener(type, listener);
  savedListeners.window = savedListeners.window.filter(
    (l) => l.type !== type && l.func !== listener
  );
};

export const addOnMessageListener = (listener: ListenerFn) => {
  chrome.runtime.onMessage.addListener(listener);
  savedListeners.runtimeMessage.push(listener);
};

export const removeOnMessageListener = (listener: ListenerFn) => {
  chrome.runtime.onMessage.removeListener(listener);
  savedListeners.runtimeMessage = savedListeners.runtimeMessage.filter(
    (l) => l !== listener
  );
};

export const addPortMessageListener = (
  port: chrome.runtime.Port,
  listener: ListenerFn
) => {
  port.onMessage.addListener(listener);
  savedListeners.portMessage.push({ port, listener });
};

export const removePortMessageListener = (
  port: chrome.runtime.Port,
  listener: ListenerFn
) => {
  port.onMessage.removeListener(listener);
  savedListeners.portMessage = savedListeners.portMessage.filter(
    (l) => l.port !== port && l.listener !== listener
  );
};

export const createPort = (channelName: string) => {
  const port = chrome.runtime.connect({ name: channelName });
  savedListeners.port.push(port);
  return port;
};

export const removePort = (port: chrome.runtime.Port) => {
  port.disconnect();
  savedListeners.port = savedListeners.port.filter((p) => p !== port);
};
