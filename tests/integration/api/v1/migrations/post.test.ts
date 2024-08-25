import { cleanDatabase } from "infra/dbUtils";

beforeAll(cleanDatabase);

test("POST to /api/v1/migrations should return 201 then 200", async () => {
  const { response: response1, parsedRes: parsedRes1 } = await request();
  expect(parsedRes1.pendingMigrations.length).toBeGreaterThan(0);
  expect(response1.status).toBe(201);

  const { response: response2, parsedRes: parsedRes2 } = await request();
  expect(parsedRes2.pendingMigrations.length).toBe(0);
  expect(response2.status).toBe(200);
});

async function request() {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  return {
    response,
    parsedRes: await response.json(),
  };
}
