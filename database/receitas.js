const prisma = require("./prisma");

const getAllReceitas = (userId) => {
    return prisma.receitas.findMany({
        where: {
            userId
        }
    })
}


const saveReceitas = (receitas, userId) => {
    return prisma.receitas.create({
        data: {
            name: receitas.name,
            descricao: receitas.descricao,
            tempPreparo: receitas.tempPreparo,
            userId: userId
        }
    })
}

const updateReceita = (id, receita) => {
    return prisma.receitas.update({
        where: {
            id: id
        },
        data: receita
    })
}

const deleteReceita = (id) => {
    return prisma.receitas.delete({
        where: {
            id,
        }
    });
}

module.exports = {
    saveReceitas,
    getAllReceitas,
    updateReceita,
    deleteReceita
}