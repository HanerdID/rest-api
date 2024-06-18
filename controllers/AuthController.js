import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const Me = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, // Sertakan role di payload token
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const Register = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        name: name,
        role: role,
      },
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({ error: "Token is missing" });
    }

    // Check the number of tokens in the blacklist
    const tokenCount = await prisma.token.count();

    if (tokenCount >= 2) {
      // Clear the blacklist table if it has 5 or more tokens
      await prisma.token.deleteMany();
    }
    // Save the token in the database to invalidate it
    await prisma.token.create({
      data: {
        token,
      },
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
