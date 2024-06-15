import { PrismaClient } from "@prisma/client";

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
    res.status(200).json(wisata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createWisata = async (req, res) => {
  try {
    const { name, description, location, image } = req.body;
    const wisata = await prisma.wisata.create({
      data: {
        name: name,
        description: description,
        location: location,
        image: image,
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
    const { name, description, location, image } = req.body;
    const wisata = await prisma.wisata.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        description: description,
        location: location,
        image: image,
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
