const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://c2paydbadmin:wPNognhZJkYABXxu@cluster0.t3eerp1.mongodb.net/website-monitore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model
const websiteSchema = new mongoose.Schema({
  url: String,
  isOnline: Boolean,
  httpStatusCode: Number,
  responseTime: Number,
}, { timestamps: true });

const Website = mongoose.model('Website', websiteSchema);

// Middleware
app.use(bodyParser.json());

app.get('/', async(req, res) => {
res.status(200).send("Welcome");
});
// Routes
app.post('/websites', async (req, res) => {
  try {
    console.log("Received POST request");
    const { url, isOnline, httpStatusCode, responseTime } = req.body;
    const website = new Website({
      url,
      isOnline,
      httpStatusCode,
      responseTime,
    });
    console.log(`url ${url}`);
    console.log(`isOnline ${isOnline}`);
    console.log(`httpStatusCode ${httpStatusCode}`);
    console.log(`responseTime ${responseTime}`);


    await website.save();
    res.status(200).json(website);
  } catch (error) {
    console.error('Error saving website:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
