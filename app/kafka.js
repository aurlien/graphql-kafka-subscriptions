import 'dotenv/config'
import { Kafka } from 'kafkajs'
import { KafkaPubSub } from 'graphql-kafkajs-subscriptions'

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env

const sasl = { username, password, mechanism: 'plain' } 

export const kafka = new Kafka({
  clientId: 'test-client',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
  sasl,
  ssl: true
})

export const pubsub = await KafkaPubSub.create({
  topic: 'trades',
  kafka,
  groupIdPrefix: "pubsub", // used for kafka pub/sub,
  producerConfig: {},
  consumerConfig: {}
})