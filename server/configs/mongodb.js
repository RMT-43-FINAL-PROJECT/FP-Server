const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("fp-rmt-43");

function getCollection(collectionName) {
  return db.collection(collectionName);
}

module.exports = {
  db,
  getCollection,
};