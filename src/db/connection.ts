/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dialect, Sequelize } from "sequelize";

const ENV = process.env.NODE_ENV ?? "development";

if (!process.env.PG_DATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {
  dialect: "postgres" as Dialect,
  host: "localhost",
  logging: false,
};

const supabaseString = process.env.DATABASE_URL;

const PG_DATABASE = process.env.PG_DATABASE;
const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;

if (!PG_DATABASE) {
  throw new Error("PG_DATABASE not set");
}

const db: Sequelize =
  ENV === "production"
    ? new Sequelize(supabaseString ?? "", {
        dialect: "postgres",
        logging: false,
      })
    : new Sequelize(PG_DATABASE, PG_USER!, PG_PASSWORD, config);

export default db;
