const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require("express");
const router = express();


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

router.post('MyAccount/delete', async (req, res) => {
    const {userId} = req.params;
    const deleting = await prisma.person.delete({
        where: {
            id: Number(userId)
        }
    })
    res.json(deleting);
});

router.listen(3000);