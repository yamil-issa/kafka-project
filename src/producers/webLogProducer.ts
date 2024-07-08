import { Kafka } from 'kafkajs';
import { faker } from '@faker-js/faker';

const kafka = new Kafka({
  clientId: 'web-log-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const generateWebLog = () => {
  return {
    ip: faker.internet.ip(),
    timestamp: new Date().toISOString(),
    method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
    url: faker.internet.url(),
    responseTime: faker.number.int({ min: 100, max: 5000 })
  };
};

const run = async () => {
  await producer.connect();
  setInterval(async () => {
    const log = generateWebLog();
    await producer.send({
      topic: 'web-logs',
      messages: [
        { value: JSON.stringify(log) }
      ],
    });
    console.log('Web log sent:', log);
  }, 2000); // Every 2 seconds
};

run().catch(console.error);
