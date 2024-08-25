import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "<rootDir>"],
  globalSetup: "./jest.setup.ts",
};

export default createJestConfig(config);
