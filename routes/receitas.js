const express = require("express");
const {saveReceitas, getAllReceitas} = require("../database/receitas");
const { receitas } = require("../database/prisma");
const router = express.Router();

router.get("/receitas", async (req, res) => {
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    const receitas = await getAllReceitas(moreThan)
    res.json({
        receitas
    })
})

router.post("/receitas", async (req, res) => {
    const newReceitas = {
        name: req.body.name,
        descricao: req.body.descricao,
        temp_Preparo: req.body.temp_Preparo
    }
    const savedProduct = await saveReceitas(newReceitas);
    res.json({
        receita: savedProduct
    })
})

module.exports = {
    router
}