const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.get('/fetch-csv', async (req, res) => {
  try {
    const response = await axios.get('https://storage.googleapis.com/old-data-2023/old%20data%20-%20Sheet1.csv');
    const csvData = response.data;
    res.send(csvData);
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
