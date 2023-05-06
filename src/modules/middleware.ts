import { validationResult } from "express-validator";

export const handleInputError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400); // bad request aka you didn't send the right thing
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};
 