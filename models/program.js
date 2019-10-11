const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

//Define a schema
// const WorkoutSchema = new Schema({
//     Id: Schema.ObjectId,
//     Program: String,
//     userID: String,
//     Exercises: [{name: String, discription: String, set: Number, reps: String}] 
// });

const WorkoutSchema = new Schema({
    Id: Schema.ObjectId,
    Program: String,
    userID: String,
    Exercise: [String],
    Description: [String],
    Set: [Number],
    Reps: [String],
});

const program = mongoose.model('program', WorkoutSchema);

module.exports = program;