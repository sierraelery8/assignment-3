const healthReader = require('../healthReader');
const fs = require('fs');
const path = require('path');

describe('Health Reader', () => {

  const testFile = path.join(__dirname, 'test-health.json');

  beforeAll(() => {
    fs.writeFileSync(
      testFile,
      JSON.stringify([
        { steps: 5000 },
        { steps: 8000 }
      ])
    );
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  test('reads valid JSON file', async () => {
    const result = await healthReader(testFile);

    expect(result).toHaveProperty('totalEntries');
    expect(result.totalEntries).toBe(2);
  });

  test('throws error when file is missing', async () => {
    await expect(
      healthReader('missing.json')
    ).rejects.toThrow();
  });

});
