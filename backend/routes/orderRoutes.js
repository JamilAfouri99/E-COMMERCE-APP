import express from 'express';
const router = express.Router();
import { auth, admin } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';

router.route('/').post(auth, addOrderItems).get(auth, admin, getOrders);
// router.post('/', auth, addOrderItems)
router.get('/myorders', auth, getMyOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/pay', auth, updateOrderToPaid);
router.put('/:id/deliver', auth, admin, updateOrderToDelivered);

export default router;
