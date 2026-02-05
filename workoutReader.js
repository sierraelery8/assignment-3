const fs = require("fs");
const csv = require("csv-parser");

function workoutCalculator(filePath) {
  let totalWorkouts = 0;
  let totalMinutes = 0;
  const workouts = [];

  try {
    fs.createReadStream(filePath)
      .on("error", (error) => {
        if (error.code === "ENOENT") {
          console.error("Error: Workout CSV file not found");
        } else {
          console.error("Error reading CSV file");
        }
      })
      .pipe(csv())
      .on("data", (row) => {
        workouts.push(row);
      })
      .on("end", () => {
        // counting workouts
        totalWorkouts = workouts.length;

        // calculating the total minutes using a basic for loop
        for (let i = 0; i < workouts.length; i++) {
          totalMinutes += Number(workouts[i].duration);
        }

        console.log(`Total workouts: ${totalWorkouts}`);
        console.log(`Total minutes: ${totalMinutes}`);
      });

  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}

// verifying output
workoutCalculator("./data/workouts.csv");
