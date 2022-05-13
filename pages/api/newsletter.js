function handler(req, res) {
  if (req.method === 'POST') {
    // We will have .body if it is a POST Request.
    // The .email field is up to us - we should add it to the body in the Request.
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    console.log(userEmail);
    res.status(210).json({ message: 'Signed up!' });
  }
}

export default handler;
