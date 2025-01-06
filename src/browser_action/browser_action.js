let myrecUrl = "https://s2.ta.kingoftime.jp/independent/recorder/personal/";

const replaceMyrecToNeed = () => {
  chrome.storage.sync.get(["s3Selected", "s4Selected", "samlSelected"], (items) => {
    const iframe = document.querySelector("#myrec iframe");
    if (iframe && (items.s3Selected || items.s4Selected || items.samlSelected)) {
      let subdomain = "s2";
      if (items.s3Selected) {
        subdomain = "s3";
      } else if (items.s4Selected) {
        subdomain = "s4";
      }
      const recorder = !items.samlSelected ? "recorder" : "recorder2"

      myrecUrl = `https://${subdomain}.ta.kingoftime.jp/independent/${recorder}/personal/`;
      iframe.src = myrecUrl;
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
