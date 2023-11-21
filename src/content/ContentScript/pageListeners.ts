type PageListeners = {
  window: Array<{ type: string; func: (event: any) => void }>;
  clear: () => void;
};

// React app can be forcefully removed by AWS UI re-renders. Keep track of listeners
// so they can be properly removed.
const pageListeners: PageListeners = {
  window: [],
  clear: () => {
    pageListeners.window.forEach((listenerObject) => {
      window.removeEventListener(listenerObject.type, listenerObject.func);
    });
  },
};

export default pageListeners;
