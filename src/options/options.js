const applySlackOptions = () => {
  const slackEnabled = document.getElementById('slackEnabled').checked,
        slackChannel = document.getElementById('slackChannel').value,
        slackClockInMessage = document.getElementById('slackClockInMessage').value,
        slackClockOutMessage = document.getElementById('slackClockOutMessage').value,
        slackTakeABreakMessage = document.getElementById('slackTakeABreakMessage').value,
        slackBreakIsOverMessage = document.getElementById('slackBreakIsOverMessage').value,
        slackApiType = document.querySelector('[name=slackApiType]:checked').value,
        slackToken = document.getElementById('slackToken').value,
        slackWebHooksUrl = document.getElementById('slackWebHooksUrl').value;

  chrome.storage.sync.set({
    slackEnabled: slackEnabled,
    slackChannel: slackChannel,
    slackClockInMessage: slackClockInMessage,
    slackClockOutMessage: slackClockOutMessage,
    slackTakeABreakMessage: slackTakeABreakMessage,
    slackBreakIsOverMessage: slackBreakIsOverMessage,
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

  if(!slackEnabled){
    alert('有効にするチェックが入っていません。');
  }
}

const applySlackStatusOptions = () => {
  const slackStatusEnabled = document.getElementById('slackStatusEnabled').checked,
        slackClockInStatusEmoji = document.getElementById('slackClockInStatusEmoji').value,
        slackClockInStatusText = document.getElementById('slackClockInStatusText').value,
        slackClockOutStatusEmoji = document.getElementById('slackClockOutStatusEmoji').value,
        slackClockOutStatusText = document.getElementById('slackClockOutStatusText').value,
        slackTakeABreakStatusEmoji = document.getElementById('slackTakeABreakStatusEmoji').value,
        slackTakeABreakStatusText = document.getElementById('slackTakeABreakStatusText').value,
        slackStatusToken = document.getElementById('slackStatusToken').value;

  chrome.storage.sync.set({
    slackStatusEnabled: slackStatusEnabled,
    slackClockInStatusEmoji: slackClockInStatusEmoji,
    slackClockInStatusText: slackClockInStatusText,
    slackClockOutStatusEmoji: slackClockOutStatusEmoji,
    slackClockOutStatusText: slackClockOutStatusText,
    slackTakeABreakStatusEmoji: slackTakeABreakStatusEmoji,
    slackTakeABreakStatusText: slackTakeABreakStatusText,
    slackStatusToken: slackStatusToken,
  }, () => {
    const button = document.getElementById('slackStatusApply');
    button.classList.add("is-loading")
    setTimeout(() => {
      button.classList.remove("is-loading")
    }, 750);
  });

  if(!slackStatusEnabled){
    alert('有効にするチェックが入っていません。');
  }

}

const restoreOptions = () => {
  chrome.storage.sync.get([
    "debuggable",

    // Message
    "slackEnabled",
    "slackChannel",
    "slackClockInMessage",
    "slackClockOutMessage",
    "slackTakeABreakMessage",
    "slackBreakIsOverMessage",
    "slackApiType",
    "slackToken",
    "slackWebHooksUrl",

    // Status
    "slackStatusEnabled",
    "slackClockInStatusEmoji",
    "slackClockInStatusText",
    "slackClockOutStatusEmoji",
    "slackClockOutStatusText",
    "slackTakeABreakStatusEmoji",
    "slackTakeABreakStatusText",
    "slackStatusToken",

    // KING OF TIME Domain
    "s3Selected",

    // KING OF TIME Authentication
    "samlSelected",

    // Open in new tab
    "openInNewTab"
  ], (items) => {
    document.getElementById('debuggable').checked = items.debuggable;

    document.getElementById('slackEnabled').checked = items.slackEnabled;
    document.getElementById('slackChannel').value = items.slackChannel ? items.slackChannel : "";
    document.getElementById('slackClockInMessage').value = items.slackClockInMessage ? items.slackClockInMessage : "";
    document.getElementById('slackClockOutMessage').value = items.slackClockOutMessage ? items.slackClockOutMessage: "";
    document.getElementById('slackTakeABreakMessage').value = items.slackTakeABreakMessage ? items.slackTakeABreakMessage : "";
    document.getElementById('slackBreakIsOverMessage').value = items.slackBreakIsOverMessage ? items.slackBreakIsOverMessage: "";
    items.slackApiType !== 'asUser' ? document.querySelector('[name=slackApiType][value=IncomingWebHooks]').checked = true : document.querySelector('[name=slackApiType][value=asUser]').checked = true
    document.getElementById('slackToken').value = items.slackToken ? items.slackToken : "";
    document.getElementById('slackWebHooksUrl').value = items.slackWebHooksUrl ? items.slackWebHooksUrl : "";

    document.getElementById('slackStatusEnabled').checked = items.slackStatusEnabled;
    document.getElementById('slackClockInStatusEmoji').value = items.slackClockInStatusEmoji ? items.slackClockInStatusEmoji : "";
    document.getElementById('slackClockInStatusText').value = items.slackClockInStatusText ? items.slackClockInStatusText : "";
    document.getElementById('slackClockOutStatusEmoji').value = items.slackClockOutStatusEmoji ? items.slackClockOutStatusEmoji: "";
    document.getElementById('slackClockOutStatusText').value = items.slackClockOutStatusText ? items.slackClockOutStatusText: "";
    document.getElementById('slackTakeABreakStatusEmoji').value = items.slackTakeABreakStatusEmoji ? items.slackTakeABreakStatusEmoji: "";
    document.getElementById('slackTakeABreakStatusText').value = items.slackTakeABreakStatusText ? items.slackTakeABreakStatusText: "";
    document.getElementById('slackStatusToken').value = items.slackStatusToken ? items.slackStatusToken: "";

    document.getElementById('s2Selected').checked = !items.s3Selected;
    document.getElementById('s3Selected').checked = items.s3Selected;

    document.getElementById('accountSelected').checked = !items.samlSelected;
    document.getElementById('samlSelected').checked = items.samlSelected;

    document.getElementById('openInPopupSelected').checked = !items.openInNewTab;
    document.getElementById('openInNewTabSelected').checked = items.openInNewTab;
  });
}

const postToSlack = () => {
  const slackChannel = document.getElementById('slackChannel').value,
        slackClockInMessage = document.getElementById('slackClockInMessage').value,
        slackApiType = document.querySelector('[name=slackApiType]:checked').value,
        slackToken = document.getElementById('slackToken').value,
        slackWebHooksUrl = document.getElementById('slackWebHooksUrl').value;

  if (slackApiType === 'asUser') {
    const slackTokens = slackToken.split(' '); // Multiple workspaces post support
    const slackChannels = slackChannel.split(' ');  // For example, #ch1 #ch2 #ch3
    for (let i = 0; i < slackChannels.length; i++) {
      post('https://slack.com/api/chat.postMessage',
        {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + (slackTokens.length > 1 ? slackTokens[i] : slackTokens[0])
        },
        {
          'channel': slackChannels[i],
          'text': slackClockInMessage ? slackClockInMessage : 'テスト',
          'as_user': true
        }
      );
    }
  } else {
    const slackWebHooksUrls = slackWebHooksUrl.split(' '); // Multiple workspaces post support
    const slackChannels = slackChannel.split(' '); // For example, #ch1 #ch2 #ch3
    for (let i = 0; i < slackChannels.length; i++) {
      post(slackWebHooksUrls[i],
        {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        {
          'channel': slackChannels[i],
          'text': slackClockInMessage ? slackClockInMessage : 'テスト'
        }
      );
    }
  }
}

const changeStatus = () => {
  const slackClockInStatusEmoji = document.getElementById('slackClockInStatusEmoji').value,
        slackClockInStatusText = document.getElementById('slackClockInStatusText').value,
        slackStatusToken = document.getElementById('slackStatusToken').value;

  const slackStatusTokens = slackStatusToken.split(' '); // Multiple workspaces post support
  for(let i = 0; i < slackStatusTokens.length; i++) {
    post('https://slack.com/api/users.profile.set',
    {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + slackStatusTokens[i]
    },
    {
      'profile': {
        'status_emoji': slackClockInStatusEmoji !== '' ? slackClockInStatusEmoji : ':office:',
        'status_text': slackClockInStatusText !== '' ? slackClockInStatusText : '仕事中',
        'status_expiration': 0
      }
    },
    'slackStatusTest');
  }
}

const post = (endpoint, headers, payload, buttonId = 'slackTest') => {
  const button = document.getElementById(buttonId);
  button.classList.add('is-loading');
  fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    button.classList.remove('is-loading');
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('slackApply').addEventListener('click', applySlackOptions);
document.getElementById('slackTest').addEventListener('click', postToSlack);

document.getElementById('slackStatusApply').addEventListener('click', applySlackStatusOptions);
document.getElementById('slackStatusTest').addEventListener('click', changeStatus);

document.getElementById('s2Selected').addEventListener('change', () => {
  chrome.storage.sync.set({s3Selected: false});
});

document.getElementById('s3Selected').addEventListener('change', () => {
  chrome.storage.sync.set({s3Selected: true});
});

document.getElementById('accountSelected').addEventListener('change', () => {
  chrome.storage.sync.set({samlSelected: false});
});

document.getElementById('samlSelected').addEventListener('change', () => {
  chrome.storage.sync.set({samlSelected: true});
});

document.getElementById('openInPopupSelected').addEventListener('change', () => {
  chrome.storage.sync.set({openInNewTab: false});
  chrome.action.setPopup({ popup: 'src/browser_action/browser_action.html' });
});

document.getElementById('openInNewTabSelected').addEventListener('change', () => {
  chrome.storage.sync.set({openInNewTab: true});
  chrome.action.setPopup({ popup: '' });
});

document.getElementById('debuggable').addEventListener('click', () => {
  chrome.storage.sync.set({debuggable: document.getElementById('debuggable').checked});
});
