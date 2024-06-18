import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export const getHangout = async (req, res) => {
  try {
    const hangout = await prisma.hangout.findMany();
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHangoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const hangout = await prisma.hangout.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!hangout) {
      return res.status(404).json({ error: "Hangout not found" });
    }

    hangout.image = `http://localhost:4000/${hangout.image}`;
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createHangout = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = path.extname(file.originalname);

    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      // Hapus file yang tidak diizinkan
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: "Invalid image file format" });
    }

    const imagePath = path.join("uploads", file.filename);

    const hangout = await prisma.hangout.create({
      data: {
        name: name,
        description: description,
        location: location,
        image: imagePath,
      },
    });
    res.status(201).json(hangout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHangout = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;
    const file = req.file;

    if (file) {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const fileExtension = path.extname(file.originalname);

      if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
        // Hapus file yang tidak diizinkan
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: "Invalid image file format" });
      }
    }

    const imagePath = file ? path.join("uploads", file.filename) : undefined;

    const hangout = await prisma.hangout.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        description: description,
        location: location,
        image: imagePath,
      },
    });
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHangout = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.hangout.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "hangout deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};