(() => {
  const CLOCK_IN = 'clockIn', CLOCK_OUT = 'clockOut';

  // Message
  let slackEnabled = false,
      slackChannel = '',
      slackClockInMessage = '',
      slackClockOutMessage = '',
      slackApiType = 'asUser',
      slackToken = '',
      slackWebHooksUrl = '';

  // Status
  let slackStatusEnabled = false,
      slackClockInStatusEmoji = '',
      slackClockInStatusText = '',
      slackClockOutStatusEmoji = '',
      slackClockOutStatusText = '',
      slackStatusToken = '';

  const now = new Date(),
      today = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(d=>d.toString().padStart(2, '0')).join(''),
      todayHistoryItem = localStorage.getItem('PARSONAL_BROWSER_RECORDER@RECORD_HISTORY_' + JSON.parse(localStorage.getItem('PARSONAL_BROWSER_RECORDER@SETTING')).user.user_token),
      todayHistories = JSON.parse(todayHistoryItem ? todayHistoryItem : '[]').filter(i=>i.send_timestamp.startsWith(today)),
      isClockedIn = todayHistories.some(h=>h.name === '出勤'),
      isClockedOut = todayHistories.some(h=>h.name === '退勤');

  setTimeout(() => {
    if (isClockedIn) document.querySelector('.record-clock-in').style.opacity = 0.3;
    if (isClockedOut) document.querySelector('.record-clock-out').style.opacity = 0.3;

    const setting = JSON.parse(localStorage.getItem('PARSONAL_BROWSER_RECORDER@SETTING')),
          clockInButtonId = setting.timerecorder.record_button.filter(b => b.mark === '1')[0].id,
          clockOutButtonId = setting.timerecorder.record_button.filter(b => b.mark === '2')[0].id;

    if (slackEnabled || slackStatusEnabled) {
      document.getElementById('record_' + clockInButtonId).addEventListener('click', clockIn, false);
      document.getElementById('record_' + clockOutButtonId).addEventListener('click', clockOut, false);
      console.log('Content Scripts is injected by KoT Chrome Assistant.');

      // for debug
      // document.querySelector('footer').innerHTML = '<button id="testClockIn">TestClockIn</button><button id="testClockOut">TestClockOut</button>'
      // document.getElementById('testClockIn').addEventListener('click', clockIn, false);
      // document.getElementById('testClockOut').addEventListener('click', clockOut, false);
    }
  }, 600);

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
    // Message
    slackEnabled = items.slackEnabled;
    slackChannel = items.slackChannel;
    slackClockInMessage = items.slackClockInMessage;
    slackClockOutMessage = items.slackClockOutMessage;
    slackToken = items.slackToken;
    slackWebhooksUrl = items.slackWebhooksUrl;

    // Status
    slackStatusEnabled = items.slackStatusEnabled;
    slackClockInStatusEmoji = items.slackClockInStatusEmoji;
    slackClockInStatusText = items.slackClockInStatusText;
    slackClockOutStatusEmoji = items.slackClockOutStatusEmoji;
    slackClockOutStatusText = items.slackClockOutStatusText;
    slackStatusToken = items.slackStatusToken;
  });

  const clockIn = () => {
          postMessage(slackClockInMessage);
          changeStatus(CLOCK_IN)
        },
        clockOut = () => {
          postMessage(slackClockOutMessage);
          changeStatus(CLOCK_OUT)
        };

  const postMessage = (message) => {
    if (!slackEnabled) return;

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    payload = {
      'channel': slackChannel,
      'text': message
    };

    let endpoint = slackWebHooksUrl;
    if (slackApiType === 'asUser') {
        endpoint = 'https://slack.com/api/chat.postMessage';
        headers['Authorization'] = 'Bearer ' + slackToken;
        payload['as_user'] = true;
    }
    fetch(endpoint, {
      'method': 'POST',
      'headers': headers,
      'body': JSON.stringify(payload)
    })
    .then(console.log)
    .catch(console.error);
  };

  const changeStatus = (status) => {
    if (!slackStatusEnabled) return;

    let statusEmoji = '', statusText = ''
    if (status === CLOCK_IN) {
      statusEmoji = slackClockInStatusEmoji;
      statusText = slackClockInStatusText;
    } else if (status === CLOCK_OUT) {
      statusEmoji = slackClockOutStatusEmoji;
      statusText = slackClockOutStatusText;
    }

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + slackStatusToken
    },
    payload = {
      'profile': {
        'status_emoji': statusEmoji,
        'status_text': statusText,
        'status_expiration': 0
      }
    };

    let endpoint = 'https://slack.com/api/users.profile.set';

    fetch(endpoint, {
      'method': 'POST',
      'headers': headers,
      'body': JSON.stringify(payload)
    })
    .then(console.log)
    .catch(console.error);
  }
})();