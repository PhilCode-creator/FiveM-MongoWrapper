import { on } from "events";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";

let db: Db;
let collection: Collection;
let client: MongoClient | undefined;

async function ConnectToDatabase(url: string, database: string): Promise<void> {
  if (client) {
    console.log("[MongoDB] Already connected");
    return;
  }

  try {
    client = await MongoClient.connect(url);
    db = client.db(database);
    console.log("[MongoDB] Connection established");
  } catch (e) {
    console.error("[MongoDB] Connection failed", e);
    throw e;
  }
}

onNet("onResourceStop", (resourceName: string) => {
  if (GetCurrentResourceName() != resourceName) {
    return;
  }

  if (client) {
    client.close();
    console.log("[MongoDB] Connection closed");
  }
});

// FiveM exports

exports("connect", async function (url: string, database: string) {
  await ConnectToDatabase(url, database);
});

exports("close", async function () {
  await client?.close();
});

exports("isConnected", function () {
  return client !== undefined;
});

exports("createCollection", async function (collectionName: string) {
  try {
    await db.createCollection(collectionName);
    console.log(`[MongoDB] Collection ${collectionName} created`);
    return true;
  } catch (e) {
    console.error(`[MongoDB] Failed o create collection ${collectionName}`, e);
    return false;
  }
});

exports("doesCollectionExist", async function (collectionName: string) {
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some(
    (collection) => collection.name === collectionName
  );
  return collectionExists;
});

exports(
  "findMany",
  async function (where: Record<string, any>, collectionName: string) {
    collection = db.collection(collectionName);
    return await collection.find(where).toArray();
  }
);

exports(
  "findUnique",
  async function (where: Record<string, any>, collectionName: string) {
    collection = db.collection(collectionName);
    return await collection.findOne(where);
  }
);

exports(
  "insertOne",
  async function (data: Record<string, any>, collectionName: string) {
    const collection = db.collection(collectionName);
    if (!data._id) {
      data._id = new ObjectId();
    }

    return await collection.insertOne(data);
  }
);

exports(
  "insertMany",
  async function (data: Record<string, any>[], collectionName: string) {
    const collection = db.collection(collectionName);
    data = data.map((doc) => {
      if (!doc._id) {
        doc._id = new ObjectId();
      }
      return doc;
    });

    return await collection.insertMany(data);
  }
);

exports(
  "deleteOne",
  async function (where: Record<string, any>, collectionName: string) {
    collection = db.collection(collectionName);
    return await collection.deleteOne(where);
  }
);

exports(
  "deleteMany",
  async function (where: Record<string, any>, collectionName: string) {
    collection = db.collection(collectionName);
    return await collection.deleteMany(where);
  }
);

exports(
  "updateOne",
  async function (
    where: Record<string, any>,
    data: Record<string, any>,
    collectionName: string
  ) {
    collection = db.collection(collectionName);
    return await collection.updateOne(where, { $set: data });
  }
);

exports(
  "updateMany",
  async function (
    where: Record<string, any>,
    data: Record<string, any>,
    collectionName: string
  ) {
    collection = db.collection(collectionName);
    return await collection.updateMany(where, { $set: data });
  }
);
