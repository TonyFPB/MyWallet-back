import { Config } from "jest";


const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/tests/**/*.(test|spec).ts"],
  restoreMocks: true,
  testTimeout:700000
};

export default config;