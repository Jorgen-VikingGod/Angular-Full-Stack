import * as jwt from 'jsonwebtoken';

export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      // Let's pass back the decoded token to the request object
      req.user = decoded.user;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new Error(err);
    }
  } else {
    res.status(401).json({ error: 'Authentication error. Token required.' });
  }
};

export const authorizeRole = (roles: Array<string> | string = []) => {
  return (req, res, next) => {
    if (typeof roles === 'string') {
      roles = [roles];
    }
    if (roles.length && !roles.includes(req.user.role)) {
      // user's role is not authorized
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // authentication and authorization successful
    next();
  };
};

export const authorize = (roles: Array<string> | string = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    authenticateJWT,
    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // authentication and authorization successful
      next();
    },
  ];
};
