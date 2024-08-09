// routes/tourRoutes.js
import express from 'express';
import tourController from '../controllers/tourController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

export default router;
