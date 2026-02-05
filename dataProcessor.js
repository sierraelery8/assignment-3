require('dotenv').config();

// importing my functions
const workoutCalculator = require('./workoutReader');

const healthCalculator = require('./healthReader');

// converting WEEKLY_GOAL to a number
const WEEKLY_GOAL = Number(process.env.WEEKLY_GOAL || 0);
const USER_NAME = process.env.USER_NAME || "User";


async function processFiles() {
  try {
    console.log(`Processing data for: ${USER_NAME} \n`);

    // workout data
    console.log("📁 Reading workout data...");

    
    const workoutData = await new Promise((resolve, reject) => {
      let totalWorkouts = 0;
      let totalMinutes = 0;
      const fs = require("fs");
      const csv = require("csv-parser");
      const filePath = "./data/workouts.csv";

      if (!fs.existsSync(filePath)) {
        reject(new Error("Workout CSV file not found."));
      }

      fs.createReadStream(filePath)
        .on("error", (err) => reject(err))
        .pipe(csv())
        .on("data", (row) => {
          totalWorkouts++;
          const duration = parseFloat(row.duration);
          if (!isNaN(duration)) totalMinutes += duration;
        })
        .on("end", () => {
          console.log(`Total workouts: ${totalWorkouts}`);
          console.log(`Total minutes: ${totalMinutes}`);
          resolve({ totalWorkouts, totalMinutes });
        });
    });

    // health data
    console.log("\n📁 Reading health data...");
    
    // For demonstration, assume healthCalculator works similarly
    const healthData = await healthCalculator("./data/health.csv"); 
    // healthData = { totalEntries: 8 } or similar

    console.log("\n=== SUMMARY ===");
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthData.totalEntries}`);
    console.log(`Weekly goal: ${WEEKLY_GOAL} minutes`);

    // my check goal
    if (workoutData.totalMinutes >= WEEKLY_GOAL) {
      console.log(`🎉 Congratulations ${USER_NAME}! You have exceeded your weekly goal!`);
    } else {
      console.log(`⚠️ Keep going ${USER_NAME}! You need ${WEEKLY_GOAL - workoutData.totalMinutes} more minutes to reach your weekly goal.`);
    }

  } catch (error) {
    console.error("Error processing files:", error.message);
  }
}

// running the main program
processFiles();
