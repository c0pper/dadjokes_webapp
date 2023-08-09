const express = require('express');
const db =  require('./config/dbinfo');
const router = express.Router();
const Joke = require('./models/Joke');

//All jokes
router.get('/jokes', async (req, res) => {
    try {
        const allJokes = await Joke.find({})
        res.status(200).send(allJokes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
    }

});

//Create a joke
router.post('/jokes', async (req, res) => {
    try {
        const {question, answer, rating } = req.body;

        //Create new Joke instance
        const newJoke = Joke({
            question,
            answer,
            rating
        });

        const savedJoke = await newJoke.save();
        console.log(savedJoke);
        res.status(201).send(savedJoke);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
    }
});

//Update joke
router.put('/jokes/:id', async (req, res) => {
    const { question, answer, rating } = req.body;
    console.log({question, answer, id: req.params.id})

    try {
        const updatedJoke = await Joke.findByIdAndUpdate(
            req.params.id,
            { question, answer, rating }, 
            { new: true }
        );
        
        if (!updatedJoke) {
            return res.status(404).json({ error: 'Joke not found' });
        }

        res.json(updatedJoke);
    } catch (error) {
        console.error('Error updating joke:', error);
        res.status(500).json({ error: 'An error occurred while updating the joke.' });
    }
});

//Delete joke
router.delete('/jokes/:id', async (req, res) => {
    try {
        await Joke.findByIdAndDelete(req.params.id)
    } catch (error) {
        console.error('Error deleting joke:', error);
        res.status(500).json({ error: 'An error occurred while deleting the joke.' });
    }
});

// get a random joke
router.get('/randomjokes', async (req, res) => {
    try {
        const count = await Joke.countDocuments(); // Get the count of documents in the collection
        const randomIndex = Math.floor(Math.random() * count); // Generate a random index
  
        // Find one document at the generated random index
        const randomJoke = await Joke.findOne().skip(randomIndex);
        res.json(randomJoke);
    } catch (error) {
        console.error('Error retrieving random joke:', error);
        res.status(500).json({ error: 'An error occurred while retrieving a random joke.' });
    }
  });

module.exports = router;