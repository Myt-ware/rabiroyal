const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getMyOrders, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/orders — place an order
router.post('/', createOrder);

// GET /api/orders — get all orders (admin)
router.get('/', getOrders);

// GET /api/orders/my-orders — get current user's orders
router.get('/my-orders', protect, getMyOrders);

// PUT /api/orders/:id/status — update order status (admin)
router.put('/:id/status', updateOrderStatus);

// PUT /api/orders/:id/cancel — user cancels a pending order
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
