import * as jwt from 'jsonwebtoken';

function validateToken(req, res, next) {
  next();
  /*
  const authorizationHeaader = req.headers.authorization;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      const result = jwt.verify(token, process.env.SECRET_TOKEN);
      // Let's pass back the decoded token to the request object
      req.decoded = result;
      console.log(result);
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      console.log(err);
      throw new Error(err);
    }
  } else {
    res.status(401).json({ error: 'Authentication error. Token required.' });
  }*/
}

export default validateToken;
