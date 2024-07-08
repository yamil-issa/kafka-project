import { Kafka } from 'kafkajs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'iot-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();


const run = async () => {
  await producer.connect();
  setInterval(async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=London`);
      const data = response.data;

      await producer.send({
        topic: 'iot-data',
        messages: [
          { value: JSON.stringify(data) }
        ],
      });

      console.log('Data sent:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, 5000); // Every 5 seconds
};

run().catch(console.error);
