const express = require('express')
const multer = require('multer')
const app  = express()
const port = 3000

app.use(express.urlencoded({extended: true}))

// ルーティング
app.post("/receive", multer({ dest: 'uploads/' }).single('upload_file_minidump'), (req, res, next) =>{
  console.log(req.body, req.params)
  res.send('OK')
});

// HTTPサーバを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});
