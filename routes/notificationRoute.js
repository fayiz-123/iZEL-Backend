import express from 'express'
import { sendNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/sent-notification',sendNotifications)

export default router;