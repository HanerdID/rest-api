import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

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
    if (!kuliner) {
      return res.status(404).json({ error: "Kuliner not found" });
    }

    kuliner.image = `${process.env.BACKEND_URL}/${kuliner.image}`;
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


// export const createKuliner = async (req, res) => {
//   try {
//     const { name, description, location } = req.body;
//     const { file } = req;

//     if (!file) {
//       return res.status(400).json({ error: "No image file provided" });
//     }

//     const allowedExtensions = [".jpg", ".jpeg", ".png"];
//     const fileExtension = path.extname(file.originalname);

//     if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
//       // Hapus file yang tidak diizinkan
//       fs.unlinkSync(file.path);
//       return res.status(400).json({ error: "Invalid image file format" });
//     }

//     const imagePath = path.join("uploads", file.filename);

//     const kuliner = await prisma.kuliner.create({
//       data: {
//         name: name,
//         description: description,
//         location: location,
//         image: imagePath,
//       },
//     });
//     res.status(201).json(kuliner);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const updateKuliner = async (req, res) => {
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

    const imagePath = file
      ? path.join("uploads", file.filename)
      : undefined;

    const kuliner = await prisma.kuliner.update({
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
