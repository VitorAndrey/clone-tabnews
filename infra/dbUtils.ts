import database from "./database";

type DatabaseResponse = {
  rows: Array<{
    table_existence: boolean;
  }>;
};

export async function cleanDatabase() {
  await database.query({
    query: `
    drop schema public cascade;
    create schema public;
    `,
  });
}

export async function migrationsTableExistes() {
  const { rows }: DatabaseResponse = await database.query({
    query: `
    SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'pgmigrations'
    ) AS table_existence;
    `,
  });
  const [{ table_existence }] = rows;
  return table_existence;
}
