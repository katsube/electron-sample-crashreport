# Electron Sample - CrashReporter
クラッシュレポートを送信するアプリと、それを受信するサーバー側プログラムです。

## 解説ページ
* [[Electron] クラッシュレポートの自動送信に対応する](https://blog.katsubemakito.net/nodejs/electron/crashreporter)

## 準備
Gitでリポジトリを取得します。
```shellsession
$ git clone https://github.com/katsube/electron-sample-crashreport.git
```

Node.jsがインストールされている環境で以下のコマンドを実行し、必要なライブラリを取得します。
```shellsession
$ cd electron-sample-crashreport
$ npm install
```

## 実行方法
### サーバー
クラッシュログを保存するサーバーを立ち上げます。
```shellsession
$ node server.js
```

受信した情報はcrashlist.nedbへ、dumpファイルはuploadsフォルダが自動的に生成されその中に保存されます。

* crashlist.nedbはJSON形式のテキストファイルです。テキストエディターでも開けます。


### クライアント
以下でプレビューを行います。
```shellsession
$ npm start
```

ビルドは以下の通り。各OS用のインストーラーが作成されます。
```shellsession
$ npm run build-win
$ npm run build-mac
```

