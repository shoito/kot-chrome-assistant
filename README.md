# MyレコーダーChromeアシスタント

Chromeウェブストア - MyレコーダーChromeアシスタント・ページ
https://chrome.google.com/webstore/detail/pifbdpooppfkllaiobkaoeocbfmpabaj/

勤怠管理システム「[Myレコーダー | KING OF TIME](https://www.kingtime.jp/record/myrecorder/)」を快適に使えるようにするためのChrome拡張です。

## ブラウザの専用ボタンからポップアップ表示
ブックマークからMyレコーダーページを開くことすら面倒な人向けに、ポップアップ表示して、素早く出勤や退勤できるようにします。
![Browser Action](docs/images/browser-action.png)

## Myレコーダーページの出勤、退勤ボタンの表示アシスト
次のアクションを分かりやすくして、2重に出勤や退勤をしてしまう誤操作を予防します。
![Content Scripts](docs/images/content-scripts-clockout.png)

## 今後の実装予定
- 出勤や退勤、休憩開始、休憩終了などの操作をした際にSlackへメッセージ投稿する機能(Incoming Webhook)