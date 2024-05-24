import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary()
    table.string('code', 8).unique().notNullable()
    table.string('title').notNullable()
    table.string('author').notNullable()
    table.integer('stock').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('books')
}

