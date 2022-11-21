import { NextFunction, Request, Response } from 'express';

const MESSAGE_FIELD = 'All fields must be filled';

const validateUserName = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/

  if (!username || username === undefined) {
    return res.status(401)
      .json({ message: MESSAGE_FIELD });
  } else if (username.length < 3) {
    return res.status(401)
    .json({ message: MESSAGE_FIELD });
  } else if (!regex.test(password)) {
    return res.status(401)
    .json({ message: MESSAGE_FIELD });
  }

  next();
};

export { validateUserName };
