import { connectDatabase, insertDocument} from '../../helpers/db-util';

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

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the Database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      // here we disconnect from this client:
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

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
