const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(console.log('connected successfully'))
.catch((err) => console.log(err))

app.get('/test', (req, res) => {
    console.log('path /');
})
app.get('/post', (req,res) => {
    console.log('post path running');
})
console.log('Hello');
app.listen('5000', () => {
    console.log('server is running');
})

