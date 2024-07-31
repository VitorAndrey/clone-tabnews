import type { NextApiRequest, NextApiResponse } from "next";
import database from "infra/database";

interface DatabaseStats {
  rows: Array<{
    version: "string";
    max_connections: "string";
    opened_connections: "string";
  }>;
}

async function status(req: NextApiRequest, res: NextApiResponse) {
  const updated_at = new Date().toISOString();

  const { rows: databaseStats }: DatabaseStats = await database.query(
    `SELECT 
    current_setting('server_version') AS version,
    current_setting('max_connections')::int AS max_connections,
    (SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db') AS opened_connections;
    `
  );

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

export default status;
