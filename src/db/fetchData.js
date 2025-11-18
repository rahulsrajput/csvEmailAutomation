import connectToDatabase from './connect.js'


async function fetchUniplyData(collectionName, query){
    const { client, db } = await connectToDatabase();
    
    try{
        const collection = await db.collection(collectionName)
        
        const data = await collection.aggregate(query).toArray() // From Cursor - Loads all results into an array

        return data
    }
    catch (error) {
        console.error("Error fetching data:", error);
        
        // throw error;
    }
    finally {
        await client.close();
        
        console.log("MongoDB connection closed");
    }
}

export default fetchUniplyData