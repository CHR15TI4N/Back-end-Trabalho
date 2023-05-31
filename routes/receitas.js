const express = require("express");
const {saveReceitas, getAllReceitas, getReceitasById, updateReceita} = require("../database/receitas");
const { receitas } = require("../database/prisma");
const router = express.Router();

router.get("/receitas", async (req, res) => {
    const moreThan = req.query.receitas;
    const receitas = await getAllReceitas(moreThan)
    res.json({
        receitas: receitas
    })
})

router.get("/receitas/:id", async (req, res) => {
    const id = Number(req.params.id);
    const receitas = await getReceitasById(id);
    res.json({
        receitas: receitas
    })
})

router.post("/receitas", async (req, res) => {
    const newReceitas = {
        name: req.body.name,
        descricao: req.body.descricao,
        tempPreparo: req.body.tempPreparo
    }
    const savedProduct = await saveReceitas(newReceitas);
    res.json({
        receita: savedProduct
    })
})

router.put("/receitas/:id", async (req, res) => {
    const id = Number(req.params.id);
    const receita = {
        name: req.body.name,
        descricao: req.body.descricao,
        tempPreparo: req.body.tempPreparo 
    }
    const updatedReceita = await updateReceita(id, receita);
    res.json({
        receita: updatedReceita
    })
})

module.exports = {
    router
}