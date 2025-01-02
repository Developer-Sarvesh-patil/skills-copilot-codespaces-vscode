// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(filePath, JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('An error occurred: ' + err);
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});