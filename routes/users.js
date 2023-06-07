const express = require("express");
const { findUserByEmail, saveUser } = require("../database/users");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();

const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
})

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

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

    router.post("/login", async (req, res) => {
        try {
            const data = LoginSchema.parse(req.body);
            const user = await findUserByEmail(data.email);
            if (!user) return res.status(401).send();
            const isSamePassword = bcrypt.compareSync(data.password, user.password);
            if (!isSamePassword) return res.status(401).send();
            const token = jwt.sign(
            {
                userId: user.id,
            },
                process.env.SECRET
            );
            res.json({
                token,
            });
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return res.status(422).json({
                        message: error.errors,
                    });
                }
            res.status(500).json({
                message: "server error",
            });
        }
    });

module.exports = {
    router
};
