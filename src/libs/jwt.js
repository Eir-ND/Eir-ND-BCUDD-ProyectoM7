import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createAccessToken(payload) {
  const secretKey = process.env.TOKEN_SECRET;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
