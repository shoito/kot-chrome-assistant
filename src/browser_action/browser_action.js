chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.contentScriptQuery === 'NOT_LOGGED_IN') {
    document.getElementById('notice').innerHTML = '<div class="notification is-info"><a href="https://s2.kingtime.jp/independent/recorder/personal/" target="blank">Myレコーダー</a>から事前のログインとページの再読み込みをしてください。</div>'
  }

  return true;
});