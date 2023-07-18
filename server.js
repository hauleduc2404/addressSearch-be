const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3080;

// Kết nối tới cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'hau2404tls',
  database: 'addresses',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });


app.use(cors());
app.use(bodyParser.json());

//API gọi tất cả các tỉnh
app.get('/provinces', (req, res) => {
  connection.query(`SELECT * FROM provinces`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

//API gọi tất cả các quận huyện
app.get('/districts', (req, res) => {
  connection.query('SELECT * FROM districts', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

//API gọi tất cả các xã phường
app.get('/wards', (req, res) => {
  connection.query('SELECT * FROM wards', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
