import { Kafka } from 'kafkajs';
import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB setup
const url = process.env.MONGO_URL ?? 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'iot';
let db: Db;

const connectDB = async () => {
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(dbName);
};

const insertData = async (data: any) => {
  const collection = db.collection('iot-data');
  await collection.insertOne(data);
};

const kafka = new Kafka({
  clientId: 'iot-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'iot-group' });

const run = async () => {
  await connectDB();
  await consumer.connect();
  await consumer.subscribe({ topic: 'iot-data', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value ? JSON.parse(message.value.toString()) : null;
      console.log('Received data:', data);

      await insertData(data);
    },
  });
};

run().catch(console.error);
