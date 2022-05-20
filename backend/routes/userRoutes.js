import express from 'express';
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
} from '../controllers/userControllers.js';
import { admin, auth } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.route('/').get(auth, admin, getUsers);
router
  .route('/:id')
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser);
router.post('/login', authUser);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;
