# GraphQL Streaming using Kafka

To run this example app, configure access to your Kafka cluster by setting the following env variables (e.g. in a .env file in the project directory):
```
KAFKA_BOOTSTRAP_SERVER=<redacted>
KAFKA_USERNAME=<redacted>
KAFKA_PASSWORD=<redacted>
```

To get some meaningful results, you also nead a topic (`trades`) with data matching the Trade schema:
```graphql
type Trade {
  side: String
  quantity: Int
  symbol: String
  price: Float
}
```

Example message:
```JSON
{
  "side":"SELL",
  "quantity":4375,
  "symbol":"ZTEST",
  "price":726
}
```

Demo:
<a href="https://www.loom.com/share/3fa3b50f189f4ee59a912027dc11e36d">
    <p>Explorer | Sandbox | Studio - 19 May 2022 - Watch Video</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/3fa3b50f189f4ee59a912027dc11e36d-with-play.gif">
  </a>