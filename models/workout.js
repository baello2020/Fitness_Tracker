// Orlando Baello - Homework 17 
// setup
const mongoose = require("mongoose");
mongoose.set("debug", true);
// mongoose declared
const Schema = mongoose.Schema;

// Workout schema
const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          required: [true, "This exercise needs a type."],
        },
        name: {
          type: String,
          required: [true, "This exercise needs a name."],
        },
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((acc, exercise) => {
    return acc + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
