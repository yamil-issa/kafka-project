import express from 'express';
import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'iot';

let db: Db;

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Route for root
app.get('/', (req, res) => {
  res.send({ status: 'ok' });
});

app.get('/search', async (req, res) => {
  res.json([]);
});

app.get('/query', async (req, res) => {
  try {
    const collection = db.collection('iot-data');
    const data = await collection.find({}).toArray();
    const grafanaData = data.map(doc => ({
      target: 'iot-data',
      datapoints: [
        [doc.current.temp_c, new Date(doc.current.last_updated_epoch * 1000).getTime()]
      ]
    }));
    res.json(grafanaData);
  } catch (error) {
    console.error('Failed to fetch data', error);
    res.status(500).send('Failed to fetch data');
  }
});

app.get('/annotations', async (req, res) => {
  res.json([]);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
