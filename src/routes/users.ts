import express from 'express';
import {API} from "../API";
import {Collection, MongoClient} from "mongodb";

const router = express.Router();

let mongClient: MongoClient | undefined;
let db: Collection;

(async () => {
    mongClient = await API.DBUtil.openDBHandle();
    if(mongClient !== undefined) db = await API.DBUtil.getDB(mongClient);
})()

if(mongClient === undefined) throw new Error("There was an error opening the DB handle!");

router.get("/", async(req, res) => { // GET /users
    res.status(200).send(await API.DBUtil.getUsers(db));
});

router.get("/:id", async(req, res) => { // GET /users/:id
    res.status(200).send(await API.DBUtil.getUser(req.params.id ,db));
});

router.patch("/:id", async(req, res) => { // PATCH /users/:id
    const user = await API.DBUtil.getUser(req.params.id, db);
    if (user) {
        user.firstName = req.body.firstName === undefined ? user.firstName : req.body.firstName;
        user.lastName = req.body.lastName === undefined ? user.lastName : req.body.lastName;
        user.age = req.body.age === undefined ? user.age : req.body.age;
    } else {
        res.status(404).send("User not found!");
        return;
    }

    await API.DBUtil.updateUser(req.params.id, db, user);
    res.status(200).send(user);
});

router.delete("/:id", async(req, res) => { // DELETE /users/:id
    if(mongClient === undefined) { res.end(`error`); return; } await API.DBUtil.deleteUser(req.params.id, await API.DBUtil.getDB(mongClient));

    res.status(200).send("Success!");
});

router.post("/", async(req, res) => { // POST /users
    if(mongClient === undefined) { res.end(`error`); return; } await API.DBUtil.createUser(req.body, await API.DBUtil.getDB(mongClient));

    res.status(200).send("Success!");
});

export { router as usersRoute };