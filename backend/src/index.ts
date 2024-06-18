import express, { Request, Response, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { data } from './db';

const PORT = process.env.PORT || 3001;

morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body);
});

const app = express();
app.use(json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req: Request, res: Response) => {
  res.status(200).json(data);
});

app.get('/api/persons/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const person = data.find((p) => p.id === id);

  if (!person) {
    return res.sendStatus(404);
  }

  res.status(200).json(person);
});

app.delete('/api/persons/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const person = data.find((p) => p.id === id);

  if (!person) {
    return res.sendStatus(404);
  }

  data.splice(data.indexOf(person), 1);

  res.status(204).end();
});

app.post('/api/persons', (req: Request, res: Response) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  if (!body.number) {
    return res.status(400).send({ error: 'Number is required' });
  }

  const newPerson = {
    id: Date.now(),
    ...body,
  };

  data.push(newPerson);
  res.status(201).json(newPerson);
});

app.get('/api/info', (req: Request, res: Response) => {
  const length = data.length;
  res
    .status(200)
    .send(`<p>Phonebok has info for ${length} persons</p></br>${new Date()}`);
});

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
