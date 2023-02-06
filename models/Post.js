const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
    unique: true,
   },
   description: {
    type: String,
    required: true,
   },
   picture: {
    type: String,
    default: ""
   },
   username: {
    type: String,
    required: true,
   },
   categories: {
    type: Array, // ["Cinéma", "Music"]
    required: false,
   }
},
{ timestamps: true }
);

