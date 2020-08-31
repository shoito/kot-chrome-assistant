chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && (msg.contentScriptQuery === 'postMessage'
      || msg.contentScriptQuery === 'changeStatus')) {
    fetch(msg.endpoint, {
      'method': 'POST',
      'headers': msg.headers,
      'body': msg.body
    })
    .then((res) => res.json())
    .then((res) => {
      if (res && res.ok) {
        sendResponse({ 'status': 'success' });
      } else {
        console.error(JSON.stringify(res));
        sendResponse({ 'status': 'failed' });
      }
    })
    .catch((err) => {
      console.error(err);
      sendResponse({ 'status': 'failed' });
    });

    return true;
  }

  sendResponse({ 'status': 'listener is missing.\n' + msg });
  return true;
});
