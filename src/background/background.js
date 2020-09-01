const postRequest = (endpoint, headers, body, sendResponse) => {
  fetch(endpoint, {
    'method': 'POST',
    'headers': headers,
    'body': body
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
};

const validateEndpoint = (endpoint) => {
  const whitelist = [
    'https://slack.com/api/chat.postMessage',
    'https://slack.com/api/users.profile.set',
    'https://hooks.slack.com/services/',
  ]
  return whitelist.some((l) => endpoint.startsWith(l));
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg) {
    sendResponse({ 'status': 'listener is missing.\n' + msg });
    return true;
  }

  if (msg.contentScriptQuery === 'postMessage' && validateEndpoint(msg.endpoint)) {
    postRequest(msg.endpoint, msg.headers, msg.body, sendResponse)
    return true;
  }

  if (msg.contentScriptQuery === 'changeStatus' && validateEndpoint(msg.endpoint)) {
    postRequest(msg.endpoint, msg.headers, msg.body, sendResponse)
    return true;
  }

  sendResponse({ 'status': 'listener is missing.\n' + msg });
  return true;
});
