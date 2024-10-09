const express = require('express')
const dotenv=require('dotenv')
const {MongoClient}=require('mongodb')
const bodyParser =require('body-parser')
const cors = require('cors');
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassBANK';

const app = express()
const port = 3000
client.connect();

app.use(cors()); // Enable CORS
app.use(bodyParser.json())

app.get('/',async(req, res) => {
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findresult=await collection.find({}).toArray();
    res.json(findresult)
})
app.post('/',async(req, res) => {
    const db=client.db(dbName);
    const password=req.body
    const collection=db.collection('passwords');
    const findresult=await collection.insertOne(password)
    res.send({success:"true",findresult})
})
app.delete('/',async(req, res) => {
    const db=client.db(dbName);
    const password=req.body
    const collection=db.collection('passwords');
    const findresult=await collection.deleteOne(password)
    res.send({success:"true",findresult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})