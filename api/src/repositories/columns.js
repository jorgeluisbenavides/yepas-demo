const { SALES, SALE_ITEMS } = require('./tables');

const SALE_COLUMNS = {
  id: `${SALES}.id`,
  branchId: `${SALES}.branch_id`,
  externalSaleId: `${SALES}.external_sale_id`,
  customerId: `${SALES}.customer_id`,
  currency: `${SALES}.currency`,
  subtotal: `${SALES}.subtotal`,
  discount: `${SALES}.discount`,
  tax: `${SALES}.tax`,
  total: `${SALES}.total`,
  status: `${SALES}.status`,
  soldAt: `${SALES}.sold_at`,
  receivedAt: `${SALES}.received_at`,
  sourcePayload: `${SALES}.source_payload`,
  cashierUserId: `${SALES}.cashier_user_id`,
  createdAt: `${SALES}.created_at`,
  updatedAt: `${SALES}.updated_at`,
};

const SALE_ITEM_COLUMNS = {
  id: `${SALE_ITEMS}.id`,
  saleId: `${SALE_ITEMS}.sale_id`,
  externalLineId: `${SALE_ITEMS}.external_line_id`,
  productId: `${SALE_ITEMS}.product_id`,
  externalProductId: `${SALE_ITEMS}.external_product_id`,
  productName: `${SALE_ITEMS}.product_name`,
  quantity: `${SALE_ITEMS}.quantity`,
  unitPrice: `${SALE_ITEMS}.unit_price`,
  discount: `${SALE_ITEMS}.discount`,
  lineTotal: `${SALE_ITEMS}.line_total`,
  metadata: `${SALE_ITEMS}.metadata`,
  createdAt: `${SALE_ITEMS}.created_at`,
  updatedAt: `${SALE_ITEMS}.updated_at`,
};

module.exports = {
  SALE_COLUMNS,
  SALE_ITEM_COLUMNS,
};