const prisma = require("./prisma")

const findAllReceitas = (userId) => {
    return prisma.receita.findMany({
        where: {
            userId,
        }
    });
};

const saveReceita = (receita, userId) => {
    return prisma.receita.create({
        data: {
            name: receita.name,
            description: receita.description,
            time: receita.time,
            // userId: userId
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
};

const updateReceita = (id, {name, description, time}, userId) => {
    return prisma.receita.updateMany({
        where: {
            id, userId
        },
        data: {
            name,
            description,
            time,
            userId
        }
    });
};

const deleteReceita = (id, userId) => {
    return prisma.receita.deleteMany({
        where: {
            id, userId
        }
    });
};

module.exports = {
    findAllReceitas,
    saveReceita,
    updateReceita,
    deleteReceita,
}