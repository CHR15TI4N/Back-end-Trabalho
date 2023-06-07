const express = require("express");
const {saveReceitas, getAllReceitas, updateReceita, deleteReceita} = require("../database/receitas");
const auth = require("../middleware/auth");
const z = require("zod");
const router = express.Router();

const receitasSchema = z.object({
    name: z.string(),
    descricao: z.string(),
    tempPreparo: z.string(),
});

router.get("/receitas", auth, async (req, res) => {
    const receitas = await getAllReceitas(req.userId);
    res.json({
        receitas,
    })
})

router.post("/receitas", auth, async (req, res) => {
    try {
        const receitas = receitasSchema.parse(req.body)
        const userId = req.userId
        const savedReceita = await saveReceitas(receitas, userId);
        res.status(201).json({
            receita: savedReceita,
        });
    } catch (err) {
        if (err instanceof z.ZodError)
          return res.status(422).json({
            message: err.errors,
          });
        res.status(500).json({ message: "Server Error" });
      }
})

router.put("/receitas/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const receita = receitasSchema.parse(req.body);
    const updatedReceita = await updateReceita(id, receita);
    res.json({
        receita: updatedReceita
    })
})

router.delete("/receitas/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    await deleteReceita(id);
    res.status(204).send();
})

module.exports = {
    router
}