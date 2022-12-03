let myrecUrl = "https://s2.kingtime.jp/independent/recorder/personal/";

const replaceMyrecToNeed = () => {
  chrome.storage.sync.get(["s3Selected", "samlSelected"], (items) => {
    if (items.s3Selected) {
      if (items.samlSelected) {
        const iframe = document.querySelector("#myrec iframe");
        if (iframe) {
          myrecUrl = "https://s3.ta.kingoftime.jp/independent/recorder2/personal/";
          iframe.src = myrecUrl;
        }
        return
      }
      const iframe = document.querySelector("#myrec iframe");
      if (iframe) {
        myrecUrl = "https://s3.kingtime.jp/independent/recorder/personal/";
        iframe.src = myrecUrl;
      }
      return;
    }
    if (items.samlSelected) {
      const iframe = document.querySelector("#myrec iframe");
      if (iframe) {
        myrecUrl = "https://s2.ta.kingoftime.jp/independent/recorder2/personal/";
        iframe.src = myrecUrl;
      }
      return
    }
  });
};

replaceMyrecToNeed();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.contentScriptQuery === "NOT_LOGGED_IN") {
    document.getElementById(
      "notice"
    ).innerHTML = `<div class="notification is-info"><a href="${myrecUrl}" target="blank">Myレコーダー</a>から事前のログインとページの再読み込みをしてください。</div>`;
  }

  return true;
});
