const { MongoClient } = require("mongodb");
require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

//chores by their physicalTax...
const getChores = async (req, res) => {
    let client;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
        
        const physicalTax  = req.query.physicalTax || null
        const search = req.query.q || null
        let result;
    
        if (physicalTax) {
            result = await db.collection("chores").find({physicalTax: physicalTax}).toArray();
        }  else {
            result = await db.collection("chores").find().toArray();
            if (search) {
                result = result.filter((chor) => chor.name.includes(search))
            }
        } 
        if (!result) {
            res.status(400).json({ status: 400, message: "No results!" })
        } else {
            res.status(200).json({ status: 200, data: result })
        }
        console.log(typeof result);
        client.close();
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
};

// for individual chores
const getChore = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const currentChore = Number(req.params.chore);
    let result;
    try {
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
        result = await db.collection("chores").findOne({ _id: currentChore });
        console.log(result);
        client.close();
        return res.status(200).json({ status: 200, data: result});
    }
    catch (err) {
        res.status(500).json({ status:500, message: err });
    }
};

const getList = async (req,res) => {
    let client; 
    let result;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
        result = await db.collection("list").find().toArray()
        const message = (result.length == 0 ?  ("empty") : result)
        return res.status(200).json({status: 200, data: message})
    }
    catch (err) {
        return res.status(400).json({status: 400, message: "cannot get list"})
    } finally {
        client.close()
    }
};

const addToList = async (req, res) => {
    let newUUID = uuidv4();
    const chore = req.body.chore;
    const quantity = req.body.quantity;

    let newChore = {
        _id: chore._id,
        chore: chore,
        quantity: quantity
    }

    let client;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);

        const productResult = await db.collection("chores").findOne({ _id: chore._id});
        const result = await db.collection("list").insertOne( newChore );
        return res.status(201).json({ status: 201, message: result });
    }
    catch (err) {
        res.status(500).json({ status: 500, message: "Error in adding product" });
    } finally {
        client.close(); 
    }
};

const addLogIn = async (req, res) => {};

const createLogIn = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = "finalProject";
    const db = client.db(dbName);

};


module.exports = {
    getChores,
    getChore,
    getList,
    addToList,
    addLogIn,
    createLogIn
};