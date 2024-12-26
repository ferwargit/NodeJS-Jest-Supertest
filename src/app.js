// ./src/app.js
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/tasks", (req, res) => {
    res.json([]);
});

app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    if(!title || !description) {
        res.sendStatus(400);
        return;
    }

    res.json({ 
        title, 
        description, 
        id: uuidv4() });
});

export default app;