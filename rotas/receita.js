const express = require("express");
const z = require("zod");
const { findAllReceitas, saveReceita, updateReceita, deleteReceita } = require("../database/receita");
const { receita } = require("../database/prisma");
const auth = require("../middleware/auth");

const router = express.Router();

const ReceitaSchema = z.object({
    name: z.string(),
    description: z.string(),
    time: z.number(),
});

router.get("/receitas", async (req, res) => {
    const receitas = await findAllReceitas(req.userId);
    res.json({
        receitas,
    });
});

router.post("/receita", auth, async (req, res) => {
    try {
        const receita = ReceitaSchema.parse(req.body);
        const userId = req.userId;
        const savedReceita = await saveReceita(receita, userId);
        res.status(201).json({
            receita: savedReceita,
        });
    }   catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                message: error.errors,
            });
        }
        res.status(500).json({
            message: "Server error",
        });
    }
});

router.put("/receita/:id", auth, async (req, res) => {
    try{
        const receitaId = Number(req.params.id);
        const userId = req.userId;
        const receita = ReceitaSchema.parse(req.body);
        const receitaAtualizada = await updateReceita(receitaId, receita, userId);
        return res.json(receitaAtualizada)
    }catch(error){
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                message: error.errors,
            });
        }
        res.status(500).json({
            message: "Server error",
        });
    }
});

router.delete("/receita/:id", auth, async (req, res) => {
    try{
        const receitaId = Number(req.params.id);
        const userId = req.userId;
        const receitaDeletada = await deleteReceita(receitaId, userId);
        return res.json(receitaDeletada);
    }catch(error){
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                message: error.errors,
            });
        }
        res.status(500).json({
            message: "Server error",
        });
    }
});


module.exports = router;