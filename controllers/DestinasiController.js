import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDestinasi = async (req, res) => {
  try {
    const destinasi = await prisma.destinasi.findMany();
    res.status(200).json(destinasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getDestinasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const destinasi = await prisma.destinasi.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(destinasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const createDestinasi = async (req, res) => {
  try {
    const { name, description, location, image } = req.body;
    const destinasi = await prisma.destinasi.create({
      data: {
        name: name,
        description: description,
        location: location,
        image: image
      },
    });
    res.status(201).json(destinasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateDestinasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, image } = req.body;
    const destinasi = await prisma.destinasi.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        description: description,
        location: location,
        image: image
      },
    });
    res.status(200).json(destinasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteDestinasi = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.destinasi.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Destinasi deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}