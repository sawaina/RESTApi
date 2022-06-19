import express from "express";
import { MongoClient } from  "mongodb";
import * as DBUtil from "./db/DBUtil";

// https://www.mongodb.com/languages/javascript/mongodb-and-npm-tutorial
async function connectToCluster(uri: string) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

import { usersRoute } from "./routes/users";

export class API {
    static app = express();

    // Routes
    static usersRoute = usersRoute

    // MongoDB Util
    static connectToCluster = connectToCluster;
    static DBUtil = DBUtil;

}