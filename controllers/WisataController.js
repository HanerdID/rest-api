import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export const getWisata = async (req, res) => {
  try {
    const wisata = await prisma.wisata.findMany();
    res.status(200).json(wisata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWisataById = async (req, res) => {
  try {
    const { id } = req.params;
    const wisata = await prisma.wisata.findUnique({
      where: {
        id: Number(id),
      },
    });
    

    if (!wisata) {
      return res.status(404).json({ error: "Wisata not found" });
    }

    wisata.image = `${process.env.BACKEND_URL}/${wisata.image}`;
    res.status(200).json(wisata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createWisata = async (req, res) => {
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

    const wisata = await prisma.wisata.create({
      data: {
        name: name,
        description: description,
        location: location,
        image: imagePath,
      },
    });
    res.status(201).json(wisata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWisata = async (req, res) => {
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

    const wisata = await prisma.wisata.update({
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
    res.status(200).json(wisata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWisata = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.wisata.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "wisata deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
