/**
 * crashReorter受信サーバ
 *
 * @version 1.0.0
 * @author M.Katsube
 */

//-----------------------------------
// 定数
//-----------------------------------
const PORT = 3000   // Webサーバのポート番号
const DATA_FILE  = 'crashlist.nedb' // クラッシュ情報のファイル
const UPLOAD_DIR = 'uploads/'       // ダンプファイルの保存先

//-----------------------------------
// モジュール
//-----------------------------------
const Datastore = require('nedb')
const multer = require('multer')
const express = require('express')
const app  = express()


//-----------------------------------
// 初期設定
//-----------------------------------
// NeDB
const db = new Datastore({filename:DATA_FILE, autoload:true});

// express
const upload = multer({dest:UPLOAD_DIR})
app.use(express.urlencoded({extended: true}))

//-----------------------------------
// ルーティング
//-----------------------------------
app.post('/receive', upload.single('upload_file_minidump'), (req, res) =>{
  const data = {
    dumpfile: req.file.filename,
    ...req.body
  }

  db.insert(data, (err, newDoc)=>{
    if (err) throw err;
  });

  res.send('OK')
});

// HTTPサーバを起動する
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
});
