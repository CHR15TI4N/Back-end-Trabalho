const prisma = require("./prisma");

const saveUser = (users) => {
    return prisma.users.create({
        data: users
    })
}

const findUserByEmail = (email) => {
    return prisma.users.findUnique({
        where: {
            email,
        }
    })
}

module.exports = {
    saveUser,
    findUserByEmail
}