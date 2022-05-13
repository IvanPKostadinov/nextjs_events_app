function handler(req, res) {
  // here we get the concrete value for the [eventId] entered
  const eventId = req.query.eventId;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log({ newComment });
    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Max', text: 'A first comment' },
      { id: 'c2', name: 'Manu', text: 'A first comment' },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
