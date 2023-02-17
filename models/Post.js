const mongoose = require("mongoose");

const ToySchema = new mongoose.Schema({ type: String });
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
   //  type: Array,
    type: [String], // ["Cinéma", "Music"]
    required: false,
   }
//    categories:[{
//       type:mongoose.Schema.Types.String,
//       ref:'Categories',
//   }],
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);


