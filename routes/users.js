const express = require("express");
const { findUserByEmail, saveUser } = require("../database/users");
const bcrypt = require("bcrypt");
const z = require("zod");
const router = express.Router();

const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
})

router.post("/register", async (req, res) => {
    try {
        const user = userSchema.parse(req.body);
  
        const isEmailAlreadyUsed = await findUserByEmail(user.email);
        if (isEmailAlreadyUsed)
        return res.status(400).json({
            message: "Email already is being used",
        });
  
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        user.password = hashedPassword;
        
        const savedUser = await saveUser(user);
        delete savedUser.password;
        res.status(201).json({
            user: savedUser,
        });
      } catch (err) {
        if (err instanceof z.ZodError)
        return res.status(422).json({
            message: err.errors,
        });
        res.status(500).json({
            message: "Server error",
        });
      }
    });

module.exports = {
    router
};
