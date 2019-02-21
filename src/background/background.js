chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  sendResponse(true);
});