const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

let comments = [
  {
    id: 1,
    userId: 1,
    text: 'Very cute <3',
    author: 'Marijn Haverbeke',
    publish_date: '2019-12-14'
  },
  {
    id: 2,
    userId: 3,
    text: 'I need to get one :) ',
    author: 'Addy Osmani',
    publish_date: '2020-02-12'
  },
  {
    id: 3,
    userId: 2,
    text: 'My favorite race! I love it.',
    author: 'Axel Rauschmayer',
    publish_date: '2020-02-10'
  }
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/comment', (req, res) => {
  const comment = req.body;
  console.log(req);
  comments.push(comment);

  // output the comment to the console for debugging
  console.log(comment);

  res.send('Comment is added to the database');
});

app.get('/comment', (req, res) => {
  res.json(comments);
});

app.get('/comment/:id', (req, res) => {
  // reading id from the URL
  const id = req.params.id;

  // searching comments for the id
  for (let comment of comments) {
    if (comment.id === id) {
      res.json(comment);
      return;
    }
  }

  // sending 404 when not found something is a good practice
  res.status(404).send('Comment not found');
});

app.delete('/comment/:id', (req, res) => {
  // reading id from the URL
  const id = req.params.id;

  // remove item from the comments array
  comments = comments.filter(i => {
    if (i.id !== id) {
      return true;
    }

    return false;
  });

  // sending 404 when not found something is a good practice
  res.send('Comment is deleted');
});

app.post('/comment/:id', (req, res) => {
  // reading id from the URL
  const id = req.params.id;
  const newComment = req.body;

  // remove item from the comments array
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    if (comment.id === id) {
      comments[i] = newComment;
    }
  }

  // sending 404 when not found something is a good practice
  res.send('Comment is edited');
});

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`));
