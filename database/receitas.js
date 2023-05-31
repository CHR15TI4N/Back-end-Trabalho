const prisma = require("./prisma");

const getAllReceitas = (moreThan) => {
    return prisma.receitas.findMany({
        where: {
            temp_Preparo: {
                gt: moreThan
            }
        }
    })
}

const saveReceitas = (receita) => {
    return prisma.receitas.create({
        data: receita
    })
}

module.exports = {
    saveReceitas,
    getAllReceitas
}