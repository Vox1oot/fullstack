"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const PORT = 3001;
morgan_1.default.token('body', (req) => {
    return JSON.stringify(req.body);
});
const app = (0, express_1.default)();
// app.use(json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :body'));
app.get('/api/persons', (req, res) => {
    res.status(200).json(db_1.data);
});
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = db_1.data.find((p) => p.id === id);
    if (!person) {
        return res.sendStatus(404);
    }
    res.status(200).json(person);
});
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = db_1.data.find((p) => p.id === id);
    if (!person) {
        return res.sendStatus(404);
    }
    db_1.data.splice(db_1.data.indexOf(person), 1);
    res.status(204).end();
});
app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name) {
        return res.status(400).send({ error: 'Name is required' });
    }
    if (!body.number) {
        return res.status(400).send({ error: 'Number is required' });
    }
    const newPerson = Object.assign({ id: Date.now() }, body);
    db_1.data.push(newPerson);
    res.status(201).json(newPerson);
});
app.get('/api/info', (req, res) => {
    const length = db_1.data.length;
    res
        .status(200)
        .send(`<p>Phonebok has info for ${length} persons</p></br>${new Date()}`);
});
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
