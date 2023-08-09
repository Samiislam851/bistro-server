const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://samisiam851:IzxHVRpaCCZiyoO9@cluster0.lkouiuy.mongodb.net/?retryWrites=true&w=majority";


const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('bistro_boss');
        const menuCollection = db.collection('menu');
        

        app.get('/menu', async (req, res) => {

            const menu = await menuCollection.find({}, { sort: { title: 1 } }).toArray();
            console.log(menu);
            res.send(menu);
            

        })

        const reviews = client.db('bistro_boss').collection('reviews');
        app.get('/review', async (req, res) => {

            const review = await reviews.find({}, { sort: { title: 1 } }).toArray();
            console.log(review);
            res.send(review);
            

        })




    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server running');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})