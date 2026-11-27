const { SALES, SALE_ITEMS } = require('../src/repositories/tables');

exports.up = (knex) =>
  knex.schema.createTable(SALE_ITEMS, (table) => {
    table.bigIncrements('id').primary();
    table.bigInteger('sale_id').notNullable().references('id').inTable(SALES).onDelete('CASCADE');
    table.string('external_line_id', 100).notNullable();
    table.bigInteger('product_id').nullable();
    table.string('external_product_id', 100).notNullable();
    table.string('product_name', 255).notNullable();
    table.decimal('quantity', 14, 3).notNullable().defaultTo(1);
    table.decimal('unit_price', 14, 2).notNullable().defaultTo(0);
    table.decimal('discount', 14, 2).notNullable().defaultTo(0);
    table.decimal('line_total', 14, 2).notNullable().defaultTo(0);
    table.jsonb('metadata').nullable();
    table.timestamps(true, true);

    table.unique(['sale_id', 'external_line_id']);
    table.index(['sale_id']);
    table.index(['product_id']);
    table.index(['external_product_id']);
  });

exports.down = (knex) => knex.schema.dropTable(SALE_ITEMS);
