// Add middleware / dependencies
const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const app = express();
const port = 80;
const jokeRouter = require('./apiserver');
app.use(express.json());
app.use(express.static(__dirname));
app.use('/japi', jokeRouter); // Use API routes


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.0vfcpp8.mongodb.net/dadjokes?retryWrites=true&w=majority`)
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Database connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the database');
});


// Entry point for the web app
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });


// 404 route
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title>
      </head>
      <body>
        <h1>The page you are trying to access does not exist.</h1>
        <p>Enjoy some jokes by going to the:</p>
        <p>Dad Jokes <a href="/">HOME</a>.</p>
      </body>
    </html>
  `);
});

// Start the Server
app.listen(port, () => {
    console.log('Server started on port 80');
  });