import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_TOKEN
  );
  return token;
};

export const authenticate = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorised" });
    return;
  }
  const token = bearer.split(" ")[1];
  if (!token) {
    res.status(401);
    res.json({ message: "Not Authorised" });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "Not Authorised" });
    return;
  }
};
