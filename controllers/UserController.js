import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const createUser = async (req, res) => {
    try {
        const {name, email} = req.body;
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body;
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                email: email
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};