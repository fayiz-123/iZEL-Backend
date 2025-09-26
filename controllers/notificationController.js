// No DB collection needed just for sending notifications, 
// but we use Subscription model to fetch stored subscriptions
import webpush from "../config/webPushService.js";
import Subscription from '../models/subscriptionModel.js';
import { sendResponse } from "../utils/response.js";

export const sendNotifications = async (req, res) => {
  try {
    const { title, body, icon, tag, url } = req.body;

    const payLoad = JSON.stringify({
      title: title || "Notification",
      body: body || "You have a new update!",
      icon: icon || "/icons/apple-touch-icon.png",
      tag: tag || "general-notification", 
      url: url || "/",
    });

    const subscriptions = await Subscription.find();

    // Track failed subscriptions for cleanup
    const expiredSubs = [];

    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(sub, payLoad);
        } catch (err) {
          console.error("Push error:", err.statusCode || err.message);

          // Clean up invalid/expired subscriptions
          if (err.statusCode === 410 || err.statusCode === 404) {
            expiredSubs.push(sub._id);
          }
        }
      })
    );

    // Delete all expired in one go
    if (expiredSubs.length) {
      await Subscription.deleteMany({ _id: { $in: expiredSubs } });
      console.log("Removed expired subscriptions:", expiredSubs.length);
    }

    return sendResponse(res, 200, true, "Notifications Sent Successfully");
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
