import express from 'express'
import saveSubscription from '../controllers/subscriptionController.js';

const router = express.Router();

router.post('/subscribe',saveSubscription)

export default router;