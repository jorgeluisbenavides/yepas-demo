const { SALES } = require('../src/repositories/tables');

exports.up = (knex) =>
  knex.schema.createTable(SALES, (table) => {
    table.bigIncrements('id').primary();
    table.string('branch_id', 50).notNullable();
    table.string('external_sale_id', 100).notNullable();
    table.bigInteger('customer_id').nullable();
    table.string('currency', 10).notNullable().defaultTo('MXN');
    table.decimal('subtotal', 14, 2).notNullable().defaultTo(0);
    table.decimal('discount', 14, 2).notNullable().defaultTo(0);
    table.decimal('tax', 14, 2).notNullable().defaultTo(0);
    table.decimal('total', 14, 2).notNullable().defaultTo(0);
    table.string('status', 250).notNullable().defaultTo('COMPLETED');
    table.timestamp('sold_at', { useTz: true }).notNullable();
    table.timestamp('received_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.jsonb('source_payload').nullable();
    table.bigInteger('cashier_user_id').nullable();
    table.timestamps(true, true);

    table.unique(['branch_id', 'external_sale_id']);
    table.index(['branch_id', 'sold_at']);
    table.index(['customer_id']);
    table.index(['status']);
  });

exports.down = (knex) => knex.schema.dropTable(SALES);