// Orlando Baello - Homework 17

const { Workout } = require("../models");

module.exports = (app) => {
  // pulling all Route workouts DB.
  app.get("/api/workouts", async (req, res) => {
    const workouts = await Workout.find();
    console.log(workouts);
    try {
      res.json(workouts);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // creating a Route workout.
  app.post("/api/workouts", async ({ body }, res) => {
    const newWorkout = await Workout.create(body);
    try {
      res.status(200).json(newWorkout);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // updating a Route workout.
  app.put("/api/workouts/:id", async (req, res) => {
    const updateWorkout = await Workout.findByIdAndUpdate(req.params.id, {
      $push: {
        exercises: req.body,
      },
    });
    try {
      res.status(200).json(updateWorkout);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.get("/api/workouts/range", async (req, res) => {
    
    const today = new Date;
    const startOfWeek = today.getDate() - today.getDay();
    const endOfWeek = startOfWeek + 6;
    const beginningRange = new Date(today.setDate(startOfWeek));
    const endRange = new Date(today.setDate(endOfWeek));

    console.log(beginningRange, endRange)

    const range = await Workout.find({
      day: {
        $gte: beginningRange,
        $lte: endRange,
      },
    });

    

    try {
      res.status(200).json(range);
    } catch (error) {
      res.status(400).json(error);
    }
  });
};