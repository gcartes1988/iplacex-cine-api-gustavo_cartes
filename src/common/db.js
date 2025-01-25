import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://eve3-express:gW7Wq8EeDoJ30pTw@cluster-express.diigt.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default client;
