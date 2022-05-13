import { MongoClient } from 'mongodb';

import { CONNECTION_STRING } from '../newsletter';

async function handler(req, res) {
  // here we get the concrete value for the [eventId] entered
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(CONNECTION_STRING);

  if (req.method === 'POST') {
    // we must include these 3 properties in our Request data
    const { email, name, text } = req.body;

    // add server-side validation
    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input!' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection('comments').insertOne(newComment);

    newComment.id = result.insertedId.toString();

    console.log(result);
    console.log({ newComment });
    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const db = client.db();

    // here we retrieve all the documents
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
