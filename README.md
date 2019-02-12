# MyレコーダーChromeアシスタント

Chromeウェブストア - MyレコーダーChromeアシスタント・ページ
https://chrome.google.com/webstore/detail/pifbdpooppfkllaiobkaoeocbfmpabaj/

勤怠管理システム「[Myレコーダー | KING OF TIME](https://www.kingtime.jp/record/myrecorder/)」を快適に使えるようにするためのChrome拡張です。

## ブラウザの専用ボタンからポップアップ表示
ブックマークからMyレコーダーページを開くことすら面倒な人向けに、ポップアップ表示して、素早く出勤や退勤できるようにします。
![Browser Action](docs/images/browser-action.png)

## Myレコーダーページの出勤、退勤ボタンの表示アシスト
次のアクションを分かりやすくして、2重に出勤や退勤をしてしまう誤操作を予防します。
![Content Scripts](docs/images/content-scripts-clockout.png)

## 出勤、退勤時のSlackメッセージ通知
設定したSlackチャンネルに対して、以下のようなメッセージが送られるようにできます。  
メッセージやチャンネルはカスタマイズ可能です。

- 出勤ボタン押下時に「出社しました。」
- 退勤ボタン押下時に「退社します。」