const request = require("supertest")
const baseURL = "http://localhost:4000"

describe("GET /actors", () => {
    let newActor = {
        name: "Johny Cage",
        image_path: "test"
    }
    beforeAll(async () => {
        await request(baseURL).post("/actors").send(newActor);
    })
    afterAll(async () => {
        await request(baseURL).delete(`/actors/${newActor.id}`);
    })
    it("should return 200", async () => {
        const response = await request(baseURL).get("/actors");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it("should return actors", async () => {
        const response = await request(baseURL).get("/actors");
        expect(response.body.length >= 1).toBe(true);
    })
})

describe("POST /actors", () => {
    let newActor = {
        name: "Johny Cage",
        image_path: "test"
    }
    afterAll(async () => {
        await request(baseURL).delete(`/todo/${newActor.id}`)
    })
    it("should add an actor to actors array", async () => {
        const response = await request(baseURL).post("/actors").send(newActor);
        // console.log("Response body:", response.body)
        // const lastItem = response.body[response.body.length - 1]
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newActor["name"]);
        expect(response.body.image_path).toBe(newActor["image_path"]);
    });
});

describe("Update one actor", () => {
    let newActor = {
        // id: 58,
        name: "Johny Cage",
        image_path: "test"
    }
    beforeAll(async () => {
        newActor.id = (await request(baseURL).post("/actors").send(newActor)).body.id;
    })

    afterAll(async () => {
        await request(baseURL).delete(`/actors/${newActor.id}`)
    })
    it("should update actor if it exists", async () => {
        const response = await request(baseURL).put(`/actors/${newActor.id}`).send({
            name: "Jon Jones",
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Jon Jones");
    });
});

describe("GET /afisha", () => {
    let newAfisha = {
        title: "The Great Testsby",
        description: "test test test",
        duration: "148 min",
        image_path: "123",
        rate: 9.3,
        genres: "Drama",
    }
    beforeAll(async () => {
        await request(baseURL).post("/afisha").send(newAfisha);
    })
    afterAll(async () => {
        await request(baseURL).delete(`/afisha/${newAfisha.id}`);
    })
    it("should return 200", async () => {
        const response = await request(baseURL).get("/afisha");
        newAfisha.id = response.body[response.body.length - 1].id
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it("should return afisha", async () => {
        const response = await request(baseURL).get("/afisha");
        expect(response.body.length >= 1).toBe(true);
    })
})

describe("POST /afisha", () => {
    let newAfisha = {
        title: "The Great Testsby",
        description: "test test test",
        duration: "148 min",
        image_path: "123",
        rate: 9.3,
        genres: "Drama",
    }
    afterAll(async () => {
        await request(baseURL).delete(`/afisha/${newAfisha.id}`)
    })
    it("should add an actor to actors array", async () => {
        const response = await request(baseURL).post("/afisha").send(newAfisha);
        // console.log(response.body)
        newAfisha.id = response.body.id
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newAfisha["title"]);
        expect(response.body.image_path).toBe(newAfisha["image_path"]);
        expect(response.body.description).toBe(newAfisha["description"]);
    });
});

describe("Update one afisha", () => {
    let newAfisha = {
        title: "The Great Testsby",
        description: "test test test",
        duration: "148 min",
        image_path: "123",
        rate: 9.3,
        genres: "Drama",
    }
    beforeAll(async () => {
        newAfisha.id = (await request(baseURL).post("/afisha").send(newAfisha)).body.id;
    })

    afterAll(async () => {
        await request(baseURL).delete(`/afisha/${newAfisha.id}`)
    })
    it("should update afisha by id if it exists", async () => {
        const response = await request(baseURL).put(`/afisha/${newAfisha.id}`).send({
            title: "Death Note",
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Death Note");
    });
});

describe("Delete one afisha", () => {
    let newAfisha = {
        title: "The Great Testsby",
        description: "test test test",
        duration: "148 min",
        image_path: "123",
        rate: 9.3,
        genres: "Drama",
    }
    beforeAll(async () => {
        newAfisha.id = (await request(baseURL).post("/afisha").send(newAfisha)).body.id;
    })
    it("should delete one afisha item", async () => {
        const response = await request(baseURL).delete(`/afisha/${newAfisha.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(newAfisha.id)
        expect(response.body.title).toBe(newAfisha.title)
        expect(response.body.description).toBe(newAfisha.description)
    });
});

describe("GET /actors_afisha", () => {
    let newActor = {
        name: "Johny Cage",
        image_path: "test"
    }
    let newAfisha = {
        title: "The Great Testsby",
        description: "test test test",
        duration: "148 min",
        image_path: "123",
        rate: 9.3,
        genres: "Drama",
    }
    let newActorsAfisha = {
        // afishaId: 2,
        // actorId: 4,
        character: "Test Yagami Light"
    }
    beforeAll(async () => {
        newActor.id = (await request(baseURL).post("/actors").send(newActor)).body.id;
        newAfisha.id = (await request(baseURL).post("/afisha").send(newAfisha)).body.id;
        newActorsAfisha.actorId = newActor.id
        newActorsAfisha.afishaId = newAfisha.id
        // newActorsAfisha.id = (await request(baseURL).post("/actors_afisha").send(newActorsAfisha)).body.id;
        await request(baseURL).post("/actors_afisha").send(newActorsAfisha);
    })
    afterAll(async () => {
        await request(baseURL).delete(`/actors_afisha/${newActorsAfisha.id}`, async (err, x) => {
            await request(baseURL).delete(`/actors/${newActor.id}`)
            await request(baseURL).delete(`/afisha/${newAfisha.id}`)
        })
        // await request(baseURL).delete(`/actors/${newActor.id}`)
        // await request(baseURL).delete(`/afisha/${newAfisha.id}`);

    })
    it("should return 200", async () => {
        const response = await request(baseURL).get("/actors_afisha");
        newActorsAfisha.id = response.body[response.body.length - 1].id
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it("should return actors afisha", async () => {
        const response = await request(baseURL).get("/actors_afisha");
        expect(response.body.length >= 1).toBe(true);
    })
})

describe("POST /actors_afisha", () => {
    let newActor = {
        name: "Johny Cage",
        image_path: "test"
    }
    let newAfisha = {
        title: "The Great Testsby",
        description: "test test test",
        duration: "148 min",
        image_path: "123",
        rate: 9.3,
        genres: "Drama",
    }
    let newActorsAfisha = {
        // afishaId: 2,
        // actorId: 4,
        character: "Test Yagami Light"
    }
    beforeAll(async () => {
        newActor.id = (await request(baseURL).post("/actors").send(newActor)).body.id;
        newAfisha.id = (await request(baseURL).post("/afisha").send(newAfisha)).body.id;
        newActorsAfisha.actorId = newActor.id
        newActorsAfisha.afishaId = newAfisha.id
        // newActorsAfisha.id = (await request(baseURL).post("/actors_afisha").send(newActorsAfisha)).body.id;
    })
    afterAll(async () => {
        await request(baseURL).delete(`/actors_afisha/${newActorsAfisha.id}`, async (err, x) => {
            await request(baseURL).delete(`/actors/${newActor.id}`)
            await request(baseURL).delete(`/afisha/${newAfisha.id}`)
        })
    })
    it("should add an afisha actor to afisha actors array", async () => {
        const response = await request(baseURL).post("/actors_afisha").send(newActorsAfisha);
        // console.log(response.body)
        newActorsAfisha.id = response.body.id;
        // newActorsAfisha.id = response.body[response.body.length - 1].id
        expect(response.statusCode).toBe(201);
        expect(response.body.afishaId).toBe(newActorsAfisha.afishaId);
        expect(response.body.actorId).toBe(newActorsAfisha.actorId);
        expect(response.body.character).toBe(newActorsAfisha.character);

    });
});
