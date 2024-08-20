import { Client } from "pg";

async function query(queryObject: { text: string; values: Array<String> }) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
  } catch (error) {
    console.error("Database connection error");
  }

  try {
    const res = await client.query(queryObject);
    return res;
  } catch (err) {
    console.error(err);
    return { rows: [] };
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
