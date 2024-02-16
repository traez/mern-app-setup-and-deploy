import 'dotenv/config';
import express from 'express'
import { connect as mongoConnect } from 'mongoose'
import cors from 'cors'
import Todo from './models/Todo.js';
import path from "path";
const __dirname = path.resolve();

const basePath = "/api";
const port = process.env.PORT
const uri = process.env.MONGO_URI

mongoConnect(uri)
    .then(() => console.log('db connected'))
    .catch(err => console.log(err))

const app = express()

// To parse the request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// To handle cors error
app.use(cors())

app.post(`${basePath}/addTodo`, async (req, res) => {
    const { body } = req

    const newTodo = new Todo(body)
    const savedtodo = await newTodo.save()

    res.json(savedtodo);
})

app.delete(`${basePath}/deleteTodo`, async (req, res) => {
    const {
        body: { todoId },
    } = req

    const response = await Todo.findByIdAndDelete(todoId)
    res.json(response);
})

app.get(`${basePath}/getAllTodos`, async (_, res) => {
    const response = await Todo.find({})
    res.json(response);
})

/*
app.get('/', (_, res) => res.send('Hello from Trae Zeeofor'))
*/


app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
);



app.listen(port, () => console.log(`Server is running on ${port}`))
