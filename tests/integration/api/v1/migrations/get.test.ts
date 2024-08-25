import { cleanDatabase } from "infra/dbUtils";

beforeAll(cleanDatabase);

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const { pendingMigrations } = responseBody;

  expect(Array.isArray(pendingMigrations)).toBe(true);

  expect(responseBody).toEqual({ pendingMigrations });
  expect(pendingMigrations.length).toBeGreaterThan(0);
});
