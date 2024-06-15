import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getKuliner = async (req, res) => {
  try {
    const kuliner = await prisma.kuliner.findMany();
    res.status(200).json(kuliner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getKulinerById = async (req, res) => {
  try {
    const { id } = req.params;
    const kuliner = await prisma.kuliner.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(kuliner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createKuliner = async (req, res) => {
  try {
    const { name, description, location, image } = req.body;
    const kuliner = await prisma.kuliner.create({
      data: {
        name: name,
        description: description,
        location: location,
        image: image,
      },
    });
    res.status(201).json(kuliner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateKuliner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, image } = req.body;
    const kuliner = await prisma.kuliner.update({
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
    res.status(200).json(kuliner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteKuliner = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.kuliner.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "kuliner deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
