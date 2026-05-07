const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rabiroyal_super_secret_key_2026';

// Helper to extract userId from token (if present)
const getUserIdFromToken = (req) => {
  try {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded.id;
    }
  } catch (e) {}
  return null;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (with optional auth)
exports.createOrder = async (req, res) => {
  try {
    const { customerInfo, items, subtotal, tax, totalAmount } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const userId = getUserIdFromToken(req);

    const order = new Order({
      userId,
      customerInfo,
      items,
      subtotal,
      tax,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Public (admin protected via frontend)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// @desc    Get logged-in user's own orders
// @route   GET /api/orders/my-orders
// @access  Private (requires JWT)
exports.getMyOrders = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (error) {
    console.error('Error fetching my orders:', error);
    res.status(500).json({ message: 'Server error while fetching your orders' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Public (Should be protected in production)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error while updating order status' });
  }
};

// @desc    Cancel a pending order (by the user)
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    if (order.userId && order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    order.status = 'Cancelled';
    await order.save();
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Server error while cancelling order' });
  }
};
