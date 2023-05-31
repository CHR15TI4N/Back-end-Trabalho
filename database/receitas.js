const prisma = require("./prisma");

const getAllReceitas = (receitas) => {
    return prisma.receitas.findMany({
        where: {
            receitas
        }
    })
}

const getReceitasById = (id) => {
    return prisma.receitas.findFirst({
        where: {
            id
        }
    })
}

const saveReceitas = (receita) => {
    return prisma.receitas.create({
        data: receita
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

module.exports = {
    saveReceitas,
    getAllReceitas,
    getReceitasById,
    updateReceita
}