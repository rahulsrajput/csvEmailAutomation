import { MongoClient } from "mongodb";
import config from "../config/index.js";


async function connectToDatabase() {
    let client;
    try{
        console.log("Connecting to database..");
        client = new MongoClient(config.mongoUri);
        await client.connect();
        console.log("Connected to database");
        const db = client.db(config.dbName);
        return { client, db };
    }
    catch (error) {
        console.error("Failed to connect to database");
        // throw error;
    }
}

export default connectToDatabase;
