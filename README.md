# FiveM-MongoWrapper
Simple MongoDB Wrapper for FiveM

use build.js to compile the src and use the build file to enable the exports
lua part tho this is prob not the best implementation

```lua
_G.Mongo = {}

ResourceName = GetCurrentResourceName()

Mongo.Connect = function()
    local url = GetConvar("mongoURL", "")
    local database = GetConvar("mongoDatabase", "")
    local success, result = pcall(function()
        return exports[ResourceName]:connect(url, database)
    end)
    if not success then
        print("Error connecting to MongoDB: " .. result)
    end
    return result
end

Mongo.Disconnect = function()
    local success, result = pcall(function()
        return exports[ResourceName]:close()
    end)
    if not success then
        print("Error disconnecting from MongoDB: " .. result)
    end
    return result
end

Mongo.IsConnected = function()
    local success, result = pcall(function()
        return exports[ResourceName]:isConnected()
    end)
    if not success then
        print("Error checking connection: " .. result)
    end
    return result
end

Mongo.Find = function(collection, where)
    local success, result = pcall(function()
        return exports[ResourceName]:findUnique(where, collection)
    end)
    if not success then
        print("Error finding document in collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.DoesCollectionExist = function(collection)
    local success, result = pcall(function()
        return exports[ResourceName]:doesCollectionExist(collection)
    end)
    if not success then
        print("Error checking if collection exists: " .. result)
    end
    return result
end

Mongo.CreateCollection = function(collection)
    local success, result = pcall(function()
        return exports[ResourceName]:createCollection(collection)
    end)
    if not success then
        print("Error creating collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.FindAll = function(collection, where)
    local success, result = pcall(function()
        return exports[ResourceName]:findMany(where, collection)
    end)
    if not success then
        print("Error finding multiple documents in collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.Insert = function(collection, data)
    local success, result = pcall(function()
        return exports[ResourceName]:insertOne(data, collection)
    end)
    if not success then
        print("Error inserting document into collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.InsertMany = function(collection, data)
    local success, result = pcall(function()
        return exports[ResourceName]:insertMany(data, collection)
    end)
    if not success then
        print("Error inserting multiple documents into collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.Update = function(collection, where, data)
    local success, result = pcall(function()
        return exports[ResourceName]:updateOne(where, data, collection)
    end)
    if not success then
        print("Error updating document in collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.UpdateMany = function(collection, where, data)
    local success, result = pcall(function()
        return exports[ResourceName]:updateMany(where, data, collection)
    end)
    if not success then
        print("Error updating multiple documents in collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.Delete = function(collection, where)
    local success, result = pcall(function()
        return exports[ResourceName]:deleteOne(where, collection)
    end)
    if not success then
        print("Error deleting document from collection " .. collection .. ": " .. result)
    end
    return result
end

Mongo.DeleteMany = function(collection, where)
    local success, result = pcall(function()
        return exports[ResourceName]:deleteMany(where, collection)
    end)
    if not success then
        print("Error deleting multiple documents from collection " .. collection .. ": " .. result)
    end
    return result
end
```
### MongoDB Exports Used

- `connect(url, database)`
- `close()`
- `isConnected()`
- `findUnique(where, collection)`
- `doesCollectionExist(collection)`
- `createCollection(collection)`
- `findMany(where, collection)`
- `insertOne(data, collection)`
- `insertMany(data, collection)`
- `updateOne(where, data, collection)`
- `updateMany(where, data, collection)`
- `deleteOne(where, collection)`
- `deleteMany(where, collection)`
