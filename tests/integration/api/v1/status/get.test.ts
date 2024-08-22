test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(typeof parsedUpdatedAt).toBe("string");

  expect(responseBody).toEqual({
    updated_at: parsedUpdatedAt,
    dependences: {
      database: {
        max_connections: 100,
        opened_connections: 1,
        version: "16.0",
      },
    },
  });
});
