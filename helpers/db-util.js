import { MongoClient } from 'mongodb';

const MONGODB_USERNAME = 'ivankostadinov';
const MONGODB_PASSWORD = '1QhVdLwuLsgpCGD1';
const MONGODB_NAME = 'events';
const CONNECTION_STRING = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.pouqz.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`;

export async function connectDatabase() {
  // Here we establish the connection:
  const client = await MongoClient.connect(CONNECTION_STRING);

  return client;
}

export async function insertDocument(client, collection, document) {
  // here we connect to the DB:
  const db = client.db(); // we may add client.db(MONGODB_NAME); but here we've already added it so don't need to

  // here we get access to a concrete collection and insert one "document":
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  // here we retrieve all the documents
  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}
