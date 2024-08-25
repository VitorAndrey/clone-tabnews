import { Client } from "pg";

async function query({
  query,
  values,
}: {
  query: string;
  values?: Array<String>;
}) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  try {
    await client.connect();

    const res = await client.query({ text: query, values });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA)
    return {
      ca: process.env.POSTGRES_CA,
    };

  return process.env.NODE_ENV === "production" ? true : false;
}
