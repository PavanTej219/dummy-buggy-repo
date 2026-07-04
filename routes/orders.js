const express = require("express");
const { getOrdersForUser } = require("../utils/db");

const router = express.Router();

// GET /orders/:userId?page=1&pageSize=2
// Returns a paginated list of a user's orders.
router.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const page = parseInt(req.query.page || "1", 10);
  const pageSize = parseInt(req.query.pageSize || "2", 10);

  const allOrders = getOrdersForUser(userId);

  // BUG: off-by-one in the slice bounds. `page=1` should return the first
  // `pageSize` items (index 0..pageSize-1), but this starts the slice one
  // item too late, silently dropping the first order of every page after
  // the first — e.g. page 2 skips an order it should have shown.
  const start = page * pageSize;
  const end = start + pageSize;

  const pageItems = allOrders.slice(start, end);

  res.json({
    userId,
    page,
    pageSize,
    total: allOrders.length,
    orders: pageItems,
  });
});

module.exports = router;
