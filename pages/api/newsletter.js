import { MongoClient } from 'mongodb';

const MONGODB_USERNAME = 'ivankostadinov';
const MONGODB_PASSWORD = '1QhVdLwuLsgpCGD1';
const MONGODB_NAME = 'events';
export const CONNECTION_STRING = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.pouqz.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`;

// we switch to async-await
async function handler(req, res) {
  if (req.method === 'POST') {
    // We will have .body if it is a POST Request.
    // The .email field is up to us - we should add it to the body in the Request.
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(CONNECTION_STRING);
    // here we connect to the DB:
    const db = client.db(); // we may add client.db(MONGODB_NAME); but here we've already added it so don't need to

    // here we get access to a concrete collection and insert one "document":
    await db.collection('newsletter').insertOne({ email: userEmail });

    // here we disconnect from this client:
    client.close();

    // Alternative with .then(...)
    // MongoClient.connect(
    //   `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.pouqz.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`
    // ).then(client => {
    //   // here we connect to the DB:
    //   const db = client.db(); // we may add client.db(MONGODB_NAME); but here we've already added it so don't need to

    //   // here we get access to a concrete collection and insert a "document":
    //   return db.collection('emails').insertOne({ email: userEmail})
    // }).then();

    // console.log(userEmail);
    res.status(210).json({ message: 'Signed up!' });
  }
}

export default handler;
