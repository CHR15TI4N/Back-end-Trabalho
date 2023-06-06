const express = require("express");
const {saveReceitas, getAllReceitas, getReceitasById, updateReceita, deleteReceita} = require("../database/receitas");
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
    const savedReceita = await saveReceitas(newReceitas);
    res.json({
        receita: savedReceita
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

router.delete("/receitas/:id", async (req, res) => {
    const id = Number(req.params.id);
    await deleteReceita(id);
    res.status(204).send();
})

module.exports = {
    router
}