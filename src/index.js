import express from "express";
import path from "path";
import mongoose from 'mongoose';
import morgan from "morgan";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import auth from './routes/auth'
import users from './routes/users'
import books from './routes/books'

dotenv.config()
const app = express();
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

app.use(morgan('dev'));
app.use(bodyParser.json())

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/books', books)

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Running on localhost:3000"));
