import {kafka} from './kafka.js'

const consumer = kafka.consumer({
  groupId: "foo"
})

const main = async () => {
  await consumer.connect()

  await consumer.subscribe({
    topic: "trades",
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message', {
        topic,
        partition,
        key: message.key.toString(),
        value: message.value.toString()
      })
    }
  })

}

main().catch(async error => {
  console.error(error)
  try {
    await consumer.disconnect()
  } catch (e) {
    console.error('Failed to gracefully disconnect consumer', e)
  } 
  process.exit(1)
})