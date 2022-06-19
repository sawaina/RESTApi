import {API} from "../API";
import {v4 as uuidv4} from 'uuid';
import {Collection, Document, MongoClient, WithId} from "mongodb";

export async function openDBHandle() {
    if(process.env.DB_URI !== undefined) return await API.connectToCluster(process.env.DB_URI);
}

export async function getDB(client: MongoClient) {
    const db = client.db("TestDB")
    return db.collection("users");
}

export async function closeDBHandle(client: MongoClient) {
    await client.close();
}

export async function createUser(user: {firstName: string, lastName: string, age: number}, collection: Collection) {
    const document = {...user, id: uuidv4()};

    await collection.insertOne(document);
}

export async function getUsers(collection: Collection) {
    return await collection.find({}).toArray();
}

export async function getUser(id: string, collection: Collection) {
    return await collection.findOne({id: id});
}

export async function updateUser(id: string, collection: Collection, newData: WithId<Document>) {
    return await collection.replaceOne({id: id}, newData);
}

export async function deleteUser(id:string, collection: Collection) {
    return await collection.deleteOne({id: id});
}