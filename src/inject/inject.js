(function() {
  let now = new Date()
    , today = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(d=>d.toString().padStart(2, '0')).join('')
    , today_history_item = localStorage.getItem('PARSONAL_BROWSER_RECORDER@RECORD_HISTORY_' + JSON.parse(localStorage.getItem('PARSONAL_BROWSER_RECORDER@SETTING')).user.user_token);
  today_histories = JSON.parse(today_history_item ? today_history_item : '[]').filter(i=>i.send_timestamp.startsWith(today)),
  isClockedIn = today_histories.some(h=>h.name === '出勤'),
  isClockedOut = today_histories.some(h=>h.name === '退勤');

  setTimeout(() => {
    if (isClockedIn) document.querySelector('.record-clock-in').style.opacity = 0.3;
    if (isClockedOut) document.querySelector('.record-clock-out').style.opacity = 0.3;
    console.log('Content Scripts is injected by KoT Chrome Assistant.');
  }, 600);
}
)();
