(() => {
  let slackEnabled = false,
      slackChannel = '',
      slackClockInMessage = '',
      slackClockOutMessage = '',
      slackApiType = 'asUser',
      slackToken = '',
      slackWebHooksUrl = '';

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

    if (slackEnabled) {
      document.getElementById('record_' + clockInButtonId).addEventListener('click', clockIn, false);
      document.getElementById('record_' + clockOutButtonId).addEventListener('click', clockOut, false);
      console.log('Content Scripts is injected by KoT Chrome Assistant.');
    }
  }, 600);

  chrome.storage.sync.get([
    "slackEnabled",
    "slackChannel",
    "slackClockInMessage",
    "slackClockOutMessage",
    "slackToken",
    "slackWebHooksUrl"
  ], (items) => {
    slackEnabled = items.slackEnabled;
    slackChannel = items.slackChannel;
    slackClockInMessage = items.slackClockInMessage;
    slackClockOutMessage = items.slackClockOutMessage;
    slackToken = items.slackToken;
    slackWebhooksUrl = items.slackWebhooksUrl;
  });

  const clockIn = () => postMessage(slackClockInMessage),
        clockOut = () => postMessage(slackClockOutMessage);

  const postMessage = (message) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    payload = {
      'channel': slackChannel,
      'text': message
    };

    if (slackEnabled) {
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
    }
  };
})();