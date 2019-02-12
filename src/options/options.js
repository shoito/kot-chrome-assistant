const applySlackOptions = () => {
  const slackEnabled = document.getElementById('slackEnabled').checked,
        slackChannel = document.getElementById('slackChannel').value,
        slackClockInMessage = document.getElementById('slackClockInMessage').value,
        slackClockOutMessage = document.getElementById('slackClockOutMessage').value,
        slackApiType = document.querySelector('[name=slackApiType]:checked').value,
        slackToken = document.getElementById('slackToken').value,
        slackWebHooksUrl = document.getElementById('slackWebHooksUrl').value;

  chrome.storage.sync.set({
    slackEnabled: slackEnabled,
    slackChannel: slackChannel,
    slackClockInMessage: slackClockInMessage,
    slackClockOutMessage: slackClockOutMessage,
    slackApiType: slackApiType,
    slackToken: slackToken,
    slackWebHooksUrl: slackWebHooksUrl
  }, () => {
    const button = document.getElementById('slackApply');
    button.classList.add("is-loading")
    setTimeout(() => {
      button.classList.remove("is-loading")
    }, 750);
  });
}

const restoreSlackOptions = () => {
  chrome.storage.sync.get([
    "slackEnabled",
    "slackChannel",
    "slackClockInMessage",
    "slackClockOutMessage",
    "slackApiType",
    "slackToken",
    "slackWebHooksUrl"
  ], (items) => {
    document.getElementById('slackEnabled').checked = items.slackEnabled;
    document.getElementById('slackChannel').value = items.slackChannel ? items.slackChannel : "";
    document.getElementById('slackClockInMessage').value = items.slackClockInMessage ? items.slackClockInMessage : "";
    document.getElementById('slackClockOutMessage').value = items.slackClockOutMessage ? items.slackClockOutMessage: "";
    items.slackApiType !== 'asUser' ? document.querySelector('[name=slackApiType][value=IncomingWebHooks]').checked = true : document.querySelector('[name=slackApiType][value=asUser]').checked = true
    document.getElementById('slackToken').value = items.slackToken ? items.slackToken : "";
    document.getElementById('slackWebHooksUrl').value = items.slackWebHooksUrl ? items.slackWebHooksUrl : "";
  });
}

const postToSlack = () => {
　　const slackEnabled = document.getElementById('slackEnabled').checked,
        slackChannel = document.getElementById('slackChannel').value,
        slackClockInMessage = document.getElementById('slackClockInMessage').value,
        slackClockOutMessage = document.getElementById('slackClockOutMessage').value,
        slackApiType = document.querySelector('[name=slackApiType]:checked').value,
        slackToken = document.getElementById('slackToken').value,
        slackWebHooksUrl = document.getElementById('slackWebHooksUrl').value;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  payload = {
    'channel': slackChannel,
    'text': slackClockInMessage ? slackClockInMessage : 'テスト'
  };

  let endpoint = slackWebHooksUrl;
  if (slackApiType === 'asUser') {
    endpoint = 'https://slack.com/api/chat.postMessage';
    headers['Authorization'] = 'Bearer ' + slackToken;
    payload['as_user'] = true;
  }

  const button = document.getElementById('slackTest');
  button.classList.add("is-loading")
  setTimeout(() => {
    button.classList.remove("is-loading")
  }, 750);

  fetch(endpoint, {
    'method': 'POST',
    'headers': headers,
    'body': JSON.stringify(payload)
  })
  .then(console.log)
  .catch(console.error);
}

document.addEventListener('DOMContentLoaded', restoreSlackOptions);
document.getElementById('slackApply').addEventListener('click', applySlackOptions);
document.getElementById('slackTest').addEventListener('click', postToSlack);