import sequelize from "#db/connection.js";
import devData from "#db/data/development-data/index.js";
import testData from "#db/data/test-data/index.js";
import seed, { SeedData } from "#db/seeds/seed.js";

const ENV = process.env.NODE_ENV ?? "development";

const runDevSeed = async () => {
  await seed(devData as unknown as SeedData);
  return sequelize.close();
};
const runTestSeed = async () => {
  await seed(testData as unknown as SeedData);
  return sequelize.close();
};

if (ENV === "development") {
  await runDevSeed();
} else {
  await runTestSeed();
}
