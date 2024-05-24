import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  return knex.schema.createTable('borrows', (table) => {
    table.increments('id').primary();
    table.integer('member_id').unsigned().notNullable();
    table.foreign('member_id').references('id').inTable('members');
    table.integer('book_id').unsigned().notNullable();
    table.foreign('book_id').references('id').inTable('books');
    table.timestamp('borrow_date').defaultTo(knex.fn.now());
    table.timestamp('return_date').nullable();
    table.boolean('penalty').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
}

