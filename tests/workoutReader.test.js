const workoutReader = require('../workoutReader');
const fs = require('fs');
const path = require('path');

describe('Workout Reader', () => {

  const testFile = path.join(__dirname, 'test-workouts.csv');

  beforeAll(() => {
    // create a fake CSV
    fs.writeFileSync(
      testFile,
      "duration\n30\n45\n60"
    );
  });

  afterAll(() => {
    fs.unlinkSync(testFile); // cleanup
  });

  test('reads valid CSV file', async () => {
    const result = await workoutReader(testFile);

    expect(result).toHaveProperty('totalWorkouts');
    expect(result).toHaveProperty('totalMinutes');

    expect(result.totalWorkouts).toBe(3);
    expect(result.totalMinutes).toBe(135);
  });

  test('throws error when file is missing', async () => {
    await expect(
      workoutReader('fake-file.csv')
    ).rejects.toThrow();
  });

});
