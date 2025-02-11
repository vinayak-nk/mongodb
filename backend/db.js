
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.u1des.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";
let _db
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function initDB(callback) {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null);
  }
  try {
    // Connect the client to the server	(optional starting in v4.7)
    _db = await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return callback(null)
  } catch(err) {
    return callback(err)
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

const getDB = () => {
  if (!_db) {
    throw Error('Database not initialzed');
  }
  return _db;
};


module.exports = {
  initDB,
  getDB
}
