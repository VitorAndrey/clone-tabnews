import database from "infra/database";
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";

type ResponseData = {
  updated_at: string;
  dependences: {
    database: {
      max_connections: string;
      opened_connections: string;
      version: string;
    };
  };
};

type DatabaseStats = {
  rows: Array<{
    version: "string";
    max_connections: "string";
    opened_connections: "string";
  }>;
};

export default async function status(req: Req, res: Res<ResponseData>) {
  const updated_at = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  if (!databaseName) throw new Error("Database name not provided!");

  const { rows: databaseStats }: DatabaseStats = await database.query({
    query: `SELECT 
    current_setting('server_version') AS version,
    current_setting('max_connections')::int AS max_connections,
    (SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1) AS opened_connections;
    `,

    values: [databaseName],
  });

  const [{ version, max_connections, opened_connections }] = databaseStats;

  res.status(200).json({
    updated_at,
    dependences: {
      database: {
        max_connections,
        opened_connections,
        version,
      },
    },
  });
}
