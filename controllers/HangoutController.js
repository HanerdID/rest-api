import { PrismaClient } from "@prisma/client";

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
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createHangout = async (req, res) => {
  try {
    const { name, description, location, image } = req.body;
    const hangout = await prisma.hangout.create({
      data: {
        name: name,
        description: description,
        location: location,
        image: image,
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
    const { name, description, location, image } = req.body;
    const hangout = await prisma.hangout.update({
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
