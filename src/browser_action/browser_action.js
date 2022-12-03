let myrecUrl = "https://s2.kingtime.jp/independent/recorder/personal/";

const replaceMyrecToNeed = () => {
  chrome.storage.sync.get(["s3Selected", "samlSelected"], (items) => {
    const iframe = document.querySelector("#myrec iframe");
    if (iframe && (items.s3Selected || items.samlSelected)) {
      const secondLevelDomain = !items.samlSelected ? "kingtime.jp" : "ta.kingoftime.jp";
      const subdomain = !items.s3Selected ? "s2" : "s3";

      myrecUrl = `https://${subdomain}.${secondLevelDomain}/independent/recorder2/personal/`;
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
