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
        console.log(result);
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
    console.log(req.params);
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
    const { userId } = req.params;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
        result = await db.collection("list").find({userId}).toArray()
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
    const { userId } = req.params;
    console.log(userId);
    let newChore = {
        _id: chore._id,
        chore: chore,
        quantity: quantity,
        userId: userId
    }

    let client;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
        const result = await db.collection("list").insertOne( newChore );
        console.log(newChore);
        return res.status(201).json({ status: 201, message: result });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "Error in adding product" });
    } finally {
        client.close(); 
    }
};

const updateList = async (req, res) => {
    const chore = req.body.chore;
    const quantity = req.body.quantity;
    const { userId } = req.params;

    let client;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
                
        const newValues = { $set: { "quantity": quantity} };
        const result = await db.collection("list").updateOne({ _id: Number(chore._id) }, newValues);
        console.log(result);
        return res.status(201).json({ status: 201, message: result });
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err });
    } finally {
        client.close(); 
    }
};

const addOrder = async (req, res) => { 
    let newUUID = uuidv4(); 
    const order = req.body.order; 
    let newOrder = { _id: newUUID, order: order, } 
    let client; 
    try { 
        client = new MongoClient(MONGO_URI, options); 
        await client.connect();  
        const dbName = "finalProject";        
        const db = client.db(dbName);
        
        const result = await db.collection("missions").insertOne( newOrder );
        console.log(result);
        console.log(newOrder);
        const deleteResult = await db.collection("list").deleteMany({})
        return res.status(201).json({ status: 201, data: newOrder }); 
        } 
        catch (err) { 
            res.status(500).json({ status: 500, message: "Error in adding chore" }); 
        } 
        finally { 
            client.close();
        } 
    };

    const getOrder = async (req, res) => {
        const client = new MongoClient(MONGO_URI, options);
        const id = req.params.orderId;
        let result;
        try {
            await client.connect();
            const dbName = "finalProject";
            const db = client.db(dbName);
            result = await db.collection("mission").findOne({ _id: id});
            client.close();
            return res.status(200).json({ status: 200, data: result});
        }
        catch (err) {
            res.status(500).json({ status:500, message: err });
        }
    };

const deleteList = async(req, res) => {
    let { id } = req.params;
    id = Number(id)
    let client;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("finalProject");

        const result = await db.collection("list").deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.status(200).json({ status: 200, message: "Chore deleted successfully" });
        } else {
            res.status(400).json({ status: 400, message: "Chore not found" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    } finally {
        client.close();
    }
};

const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userId = req.params.userId;

    let result;
    try {
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
        result = await db.collection("users").findOne({ nickname: userId });
        console.log(result);
        client.close();
        if (result) {
            return res.status(200).json({ status: 200, data: result});
        } else {
            res.status(404).json({ status: 404, data: result});
        }
    }
    catch (err) {
        res.status(500).json({ status:500, message: err });
    }
}

const addUser = async (req, res) => {
    let newUUID = uuidv4();
    const user = req.body;
    let client;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const dbName = "finalProject";
        const db = client.db(dbName);
        let newUser = { userId: newUUID, ...user } 
        const result = await db.collection("users").insertOne({ ...newUser });
        return res.status(201).json({ status: 201, message: result });
    }
    catch (err) {
        res.status(500).json({ status: 500, message: "Error in adding user" });
    } finally {
        client.close(); 
    }
}

module.exports = {
    getChores,
    getChore,
    getList,
    getOrder,
    addToList,
    deleteList,
    // addLogIn,
    // createLogIn,
    updateList,
    addOrder,
    getUser,
    addUser
};