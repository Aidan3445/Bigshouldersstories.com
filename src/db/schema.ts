import { pgTable, serial, smallint, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const productions = pgTable('productions', {
  id: serial().primaryKey(),
  order: smallint('order').notNull(),
  collaborators: varchar('collaborators', { length: 512 }).array(),
  name: varchar('name', { length: 512 }).notNull(),
  description: text('description').notNull(),
  videoUrl: varchar('video_url', { length: 512 }).notNull(),
  imageId: varchar('image_id', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
})

