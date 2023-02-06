const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();

dotenv.config();
app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(console.log('connected successfully'))
.catch((err) => console.log(err))

app.use('/', authRoute);


console.log('Hello');
app.listen('5000', () => {
    console.log('server is running');
})

