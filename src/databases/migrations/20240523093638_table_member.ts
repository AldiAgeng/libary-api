import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('members', (table) => {
    table.increments('id').primary()
    table.string('code', 4).unique().notNullable()
    table.string('name').notNullable()
    table.boolean('penalty').defaultTo(false);
    table.timestamp('penalty_end').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('members')
}

