// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import {
  bigint,
  index,
  int,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `clipbroker_v2_${name}`)

export const posts = createTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
)

export const boards = createTable("board", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  passcode: varchar("passcode", { length: 4 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updateAt").onUpdateNow(),
})

export const contents = createTable("content", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  text: varchar("text", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  boardId: bigint("boardId", { mode: "number" }),
})

export const files = createTable("files", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  key: varchar("key", { length: 256 }).notNull(),
  size: int("size", { unsigned: true }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }).notNull(),
  createdAt: timestamp("create_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  boardId: bigint("boardId", { mode: "number" }),
})
