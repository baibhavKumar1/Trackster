
import { MongoClient, Db } from 'mongodb';

// Store the client and database instance
let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_URI = process.env.MONGODB_URI; // Ensure this is set in your .env file
const DB_NAME = process.env.DB_NAME; // Ensure this is set in your .env file

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
if (!DB_NAME) {
  throw new Error('Please define the DB_NAME environment variable inside .env');
}

// TypeScript now knows these are strings after the checks above
const MONGODB_URI_STRING: string = MONGODB_URI;
const DB_NAME_STRING: string = DB_NAME;

export async function connectToDatabase(): Promise<Db> {
  if (client && db) {
    // If client and db are already initialized, return the existing db instance
    return db;
  }

  try {
    // Create a new MongoClient instance
    client = new MongoClient(MONGODB_URI!);

    // Connect the client to the server
    await client.connect();

    // Select the database
    db = client.db(DB_NAME);

    console.log("Successfully connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Could not connect to database");
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error("Database connection not established. Call connectToDatabase() first.");
  }
  return db;
}

// Optional: Close the connection when the application stops
process.on('exit', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed.');
  }
});
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed due to app termination.');
    process.exit(0);
  }
});
