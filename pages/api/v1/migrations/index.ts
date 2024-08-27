import { join } from "node:path";
import migrationRunner from "node-pg-migrate";
import { RunMigration } from "node-pg-migrate/dist/migration";
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import database from "infra/database";

type ResponseData = { pendingMigrations: RunMigration[] } | { error: unknown };

type RunMigrationsParams = { dryRun: boolean };

export default async function migrations(req: Req, res: Res<ResponseData>) {
  const { method } = req;
  const dbClient = await database.getNewClient();

  if (method === "GET") {
    try {
      const { pendingMigrations } = await runMigrations({ dryRun: true });
      await dbClient.end();
      return res.status(200).send({ pendingMigrations });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  if (method === "POST") {
    try {
      const { pendingMigrations } = await runMigrations({ dryRun: false });
      await dbClient.end();
      return res
        .status(pendingMigrations.length > 0 ? 201 : 200)
        .send({ pendingMigrations });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  return res.status(405).send({ error: "Method not allowed!" });

  async function runMigrations(options: RunMigrationsParams) {
    const { dryRun } = options;

    const pendingMigrations = await migrationRunner({
      dbClient,
      migrationsTable: "pgmigrations",
      dir: join("infra", "migrations"),
      direction: "up",
      dryRun,
      verbose: true,
    });

    return { pendingMigrations };
  }
}
