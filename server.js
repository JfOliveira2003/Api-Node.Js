const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require("express");
const router = express();


router.use(express.json());

router.get('/', (req, res) => {
    res.send({message: 'hello world'});
    console.log("connected");
})

router.get("/myAccount/:id", async (req, res) => {
    const idUser = req.params.id;
    const userRequired = await prisma.person.findFirstOrThrow({
        where: {id: Number(idUser)}
    });
    res.json(userRequired);
})
router.post("/register", async (req, res) => {
    console.log(req.body)
    const {name, birthday, email} = req.body;
    const creating = await prisma.person.create({
        data:
        {
            name,
            birthday,
            email
        },
    });
    res.json(creating);
});

router.delete("/myAccount/delete", async (req, res) => {
    const userId = req.body.id;
    console.log(userId);
    const deleting = await prisma.person.delete({
        where: {
            id: Number(userId)
        }
    })
    res.json(deleting);
});

router.listen(3000);