const fs = require("fs").promises;

async function healthMetricsCounter(filePath) {
  try {

    const data = await fs.readFile(filePath, "utf8");

    // parse JSON
    const healthData = JSON.parse(data);

    // validating the structure
    if (!Array.isArray(healthData)) {
      throw new Error("Invalid JSON format: expected an array");
    }

    // counting entries
    const totalEntries = healthData.length;

    console.log(`Total health entries: ${totalEntries}`);
    return totalEntries;

  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Error: File not found");
    } else if (error instanceof SyntaxError) {
      console.error("Error: Invalid JSON file");
    } else {
      console.error("Error:", error.message);
    }
  }
}

// function to verify the output
healthMetricsCounter("./data/health-metrics.json");
