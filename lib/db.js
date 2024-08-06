// lib/db.js

import { MongoClient, ServerApiVersion } from 'mongodb';

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

// Create a client and connect it to MongoDB
if (!clientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  clientPromise = client.connect();
}

// Export the connected client and database access
async function getDb(dbName) {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default getDb;
