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

const applySlackStatusOptions = () => {
  const slackStatusEnabled = document.getElementById('slackStatusEnabled').checked,
        slackClockInStatusEmoji = document.getElementById('slackClockInStatusEmoji').value,
        slackClockInStatusText = document.getElementById('slackClockInStatusText').value,
        slackClockOutStatusEmoji = document.getElementById('slackClockOutStatusEmoji').value,
        slackClockOutStatusText = document.getElementById('slackClockOutStatusText').value,
        slackStatusToken = document.getElementById('slackStatusToken').value;

  chrome.storage.sync.set({
    slackStatusEnabled: slackStatusEnabled,
    slackClockInStatusEmoji: slackClockInStatusEmoji,
    slackClockInStatusText: slackClockInStatusText,
    slackClockOutStatusEmoji: slackClockOutStatusEmoji,
    slackClockOutStatusText: slackClockOutStatusText,
    slackStatusToken: slackStatusToken,
  }, () => {
    const button = document.getElementById('slackStatusApply');
    button.classList.add("is-loading")
    setTimeout(() => {
      button.classList.remove("is-loading")
    }, 750);
  });
}

const restoreSlackOptions = () => {
  chrome.storage.sync.get([
    // Message
    "slackEnabled",
    "slackChannel",
    "slackClockInMessage",
    "slackClockOutMessage",
    "slackApiType",
    "slackToken",
    "slackWebHooksUrl",

    // Status
    "slackStatusEnabled",
    "slackClockInStatusEmoji",
    "slackClockInStatusText",
    "slackClockOutStatusEmoji",
    "slackClockOutStatusText",
    "slackStatusToken"
  ], (items) => {
    document.getElementById('slackEnabled').checked = items.slackEnabled;
    document.getElementById('slackChannel').value = items.slackChannel ? items.slackChannel : "";
    document.getElementById('slackClockInMessage').value = items.slackClockInMessage ? items.slackClockInMessage : "";
    document.getElementById('slackClockOutMessage').value = items.slackClockOutMessage ? items.slackClockOutMessage: "";
    items.slackApiType !== 'asUser' ? document.querySelector('[name=slackApiType][value=IncomingWebHooks]').checked = true : document.querySelector('[name=slackApiType][value=asUser]').checked = true
    document.getElementById('slackToken').value = items.slackToken ? items.slackToken : "";
    document.getElementById('slackWebHooksUrl').value = items.slackWebHooksUrl ? items.slackWebHooksUrl : "";

    document.getElementById('slackStatusEnabled').checked = items.slackStatusEnabled;
    document.getElementById('slackClockInStatusEmoji').value = items.slackClockInStatusEmoji ? items.slackClockInStatusEmoji : "";
    document.getElementById('slackClockInStatusText').value = items.slackClockInStatusText ? items.slackClockInStatusText : "";
    document.getElementById('slackClockOutStatusEmoji').value = items.slackClockOutStatusEmoji ? items.slackClockOutStatusEmoji: "";
    document.getElementById('slackClockOutStatusText').value = items.slackClockOutStatusText ? items.slackClockOutStatusText: "";
    document.getElementById('slackStatusToken').value = items.slackStatusToken ? items.slackStatusToken: "";
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
    'Content-Type': 'application/json; charset=utf-8',
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

  fetch(endpoint, {
    'method': 'POST',
    'headers': headers,
    'body': JSON.stringify(payload)
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    button.classList.remove("is-loading")
  });
}

const changeStatus = () => {
  const slackStatusEnabled = document.getElementById('slackStatusEnabled').checked,
        slackClockInStatusEmoji = document.getElementById('slackClockInStatusEmoji').value,
        slackClockInStatusText = document.getElementById('slackClockInStatusText').value,
        slackClockOutStatusEmoji = document.getElementById('slackClockOutStatusEmoji').value,
        slackClockOutStatusText = document.getElementById('slackClockOutStatusText').value,
        slackStatusToken = document.getElementById('slackStatusToken').value;

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + slackStatusToken
  },
  payload = {
    'profile': {
      'status_emoji': slackClockInStatusEmoji !== '' ? slackClockInStatusEmoji : ':office:',
      'status_text': slackClockInStatusText !== '' ? slackClockInStatusText : '仕事中',
      'status_expiration': 0
    }
  };

  let endpoint = 'https://slack.com/api/users.profile.set';

  const button = document.getElementById('slackStatusTest');
  button.classList.add("is-loading")

  fetch(endpoint, {
    'method': 'POST',
    'headers': headers,
    'body': JSON.stringify(payload)
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    button.classList.remove("is-loading")
  });
}

document.addEventListener('DOMContentLoaded', restoreSlackOptions);

document.getElementById('slackApply').addEventListener('click', applySlackOptions);
document.getElementById('slackTest').addEventListener('click', postToSlack);

document.getElementById('slackStatusApply').addEventListener('click', applySlackStatusOptions);
document.getElementById('slackStatusTest').addEventListener('click', changeStatus);