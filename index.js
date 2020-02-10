const express = require('express');
const cors = require('cors');
const v1Api = require('./routers/v1');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', v1Api)

app.get('/', function (req, res) {
  console.log(req.ip, req.url)
  res.send('Hello World!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));