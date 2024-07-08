import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'web-log-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'web-log-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'web-logs', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const log = message.value ? JSON.parse(message.value.toString()) : null;
      console.log('Received web log:', log);

      // Process log (e.g., store in a database, analyze, etc.)
    },
  });
};

run().catch(console.error);
