import { join } from "node:path";
import migrationRunner from "node-pg-migrate";
import { RunMigration } from "node-pg-migrate/dist/migration";
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";

type ResponseData = { migrations: RunMigration[] } | { error: string };

export default async function migrations(req: Req, res: Res<ResponseData>) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (!process.env.DATABASE_URL)
        return res.status(500).send({ error: "DATABASE_URL not provided!" });

      const migrations = await migrationRunner({
        databaseUrl: process.env.DATABASE_URL,
        migrationsTable: "pgmigrations",
        dir: join("infra", "migrations"),
        direction: "up",
        dryRun: true,
        verbose: true,
      });

      res.send({ migrations });
      break;

    case "POST":
      return res.status(200).send({ error: "none" });
  }
}
