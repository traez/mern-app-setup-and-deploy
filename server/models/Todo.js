import { Schema, model } from 'mongoose'

const todoSchema = new Schema({
    title: String,
})

const todoModel = model('todo', todoSchema)
export default todoModel
