console.log("Background script running");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome Extension successfully installed.");
});
