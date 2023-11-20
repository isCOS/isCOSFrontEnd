import * as fs from 'fs';
import express from 'express'; // assuming you're using express.js

const app = express();

app.use(express.json()); // for parsing application/json

app.post('/save-user-data', (req, res) => {
  const userData = req.body;

  // Convert user data to JSON format
  const jsonData = JSON.stringify(userData);

  // Write JSON data to a file
  fs.writeFile('user.json', jsonData, (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return res.status(500).send(err);
    } else {
      console.log('JSON file has been saved.');
      return res.send({ message: 'JSON file has been saved.' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
