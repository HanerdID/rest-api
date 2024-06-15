import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const isAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check if the token is blacklisted
  const blacklistedToken = await prisma.token.findUnique({
    where: {
      token: token,
    },
  });

  if (blacklistedToken) {
    return res.status(403).json({ error: "Token is blacklisted" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  const { id } = req.user;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}