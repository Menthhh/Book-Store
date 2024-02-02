import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import { Book } from "./models/bookModel.js"

import mongoose from "mongoose"

const app = express()

app.post("/books", async (request, response) =>{
    try {
        if  (!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message: "Send all require fields: title, author, publishYear",
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook); // await is used to wait for the promise to be resolved
        
        return response.status(201).send(book);
    } catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

mongoose.connect(mongoDBURL)
    .then( () => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
        console.log("App is running to port " + PORT);
    });
    }).catch((err) => {
        console.log(err);
    });