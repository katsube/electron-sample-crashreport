const { app, BrowserWindow, crashReporter, ipcMain } = require('electron')
const fs = require('fs')

// クラッシュリポートを開始
// https://www.electronjs.org/docs/api/crash-reporter
crashReporter.start({
  // 必須
  submitURL: 'http://localhost:3000/receive',

  // 以降は任意
  productName: app.name,   // アプリ名(String)
  uploadToServer: true,    // サーバにアップロードするか
  ignoreSystemCrashHandler: false, // メインプロセスで発生したクラッシュをシステムクラッシュハンドラに転送しない
  rateLimit: false,        // アップロードする回数を1時間に1度にする(Windows,macOS)
  compress: true,         // アップロード時にgzipで圧縮するか(省略時はfalse)
});


let mainWin;

/**
 * ウィンドウを作成する
 */
function createWindow () {
  // ウィンドウを新たに開く
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // ファイルを開く
  mainWin.loadFile('public/index.html')
}

// 初期化が終了
app.whenReady().then(()=>{
  // ウィンドウを新規に作成する
  createWindow()

  // 1秒後にクラッシュ
  setTimeout(()=>{
    process.crash();
  }, 1000)
})


// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOS以外はアプリを終了する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// アプリがアクティブになった時の処理
// (macOSはDocのアイコンがクリックされたとき）
app.on('activate', () => {
  // ウィンドウがすべて閉じられている場合は新しく開く
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
