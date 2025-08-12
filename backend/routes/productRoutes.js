import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProductReview, 
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts, 
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public routes
router.route('/').get(getProducts);
router.route('/top').get(getTopProducts); 
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview); 

// Admin routes
router.route('/').post(protect, admin, createProduct);
router.route('/:id').put(protect, admin, updateProduct);
router.route('/:id').delete(protect, admin, deleteProduct);

export default router;