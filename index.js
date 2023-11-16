const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express()
const port = 8080
app.use(express.json());
app.use(cors());

app.get('/afisha', async (req, res) => {
    const afisha = await prisma.afisha.findMany({
        include: {
            actors: true,
        },
    });
    res.status(200).send(afisha);
})

app.post('/afisha', async (req, res) => {
    const newAfisha = req.body;
    const afisha = await prisma.afisha.create({
        data: newAfisha,
    });
    res.status(201).send(afisha);
});

app.get('/afisha/:id', async (req, res) => {
    const id = Number(req.params.id);
    const afishaById = await prisma.afisha.findUnique({
        where: {
            id: id,
        },
        include: {
            actors: {
                include: {
                    actors: true,
                }
            },
        }
    });
    res.status(200).send(afishaById);
})

app.put('/afisha/:id', async (req, res) => {
    const id = Number(req.params.id);
    const afisha = req.body;
    const updatedAfisha = await prisma.afisha.update({
        where: {
            id: id,
        },
        data: afisha,
    });
    res.status(201).send(updatedAfisha);
});

app.delete('/afisha/:id', async (req, res) => {
    const id = Number(req.params.id);
    const deletedAfisha = await prisma.afisha.delete({
        where: {
            id: id,
        },
    });
    res.status(200).send(deletedAfisha);
})

app.get('/actors/', async (req, res) => {
    const actors = await prisma.actor.findMany();
    res.status(200).send(actors);
});

app.post('/actors/', async (req, res) => {
    const newActors = req.body;
    const actors = await prisma.actor.create({ data: newActors });
    res.status(201).send(actors);
});

app.get('/actors/:id', async (req, res) => {
    const id = Number(req.params.id);
    const actorById = await prisma.actor.findUnique({
        where: {
            id: id,
        }
    });
    res.status(200).send(actorById);
});

app.put('/actors/:id', async (req, res) => {
    const id = Number(req.params.id);
    const actor = req.body;
    const updated = await prisma.actor.update({
        where: {
            id: id,
        },
        data: actor,
    });
    res.status(201).send(updated);
});

app.get('/actors_afisha', async (req, res) => {
    const actorsAfisha = await prisma.actorsOnAfisha.findMany();
    res.status(200).send(actorsAfisha);
})

app.post('/actors_afisha', async (req, res) => {
    const actorsAfisha = req.body;
    const newActorsAfisha = await prisma.actorsOnAfisha.create({ data: actorsAfisha });
    res.status(201).send(newActorsAfisha);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
