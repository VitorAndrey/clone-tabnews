import { join } from "node:path";
import migrationRunner from "node-pg-migrate";
import { RunMigration } from "node-pg-migrate/dist/migration";
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";

type ResponseData = { pendingMigrations: RunMigration[] } | { error: unknown };

type RunMigrationsParams = { dryRun: boolean };

export default async function migrations(req: Req, res: Res<ResponseData>) {
  const { method } = req;

  if (method === "GET") {
    try {
      const { pendingMigrations } = await runMigrations({ dryRun: true });
      return res.status(200).send({ pendingMigrations });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  if (method === "POST") {
    try {
      const { pendingMigrations } = await runMigrations({ dryRun: false });
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

    if (!process.env.DATABASE_URL)
      throw new Error("DATABASE_URL not provided!");

    const pendingMigrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      migrationsTable: "pgmigrations",
      dir: join("infra", "migrations"),
      direction: "up",
      dryRun,
      verbose: true,
    });

    return { pendingMigrations };
  }
}
