// This File Doesnt has a collection in DB,so NO model for this file for creating a api for senting notification only

import webpush from "../config/webPushService.js";
import Subscription from '../models/subscriptionModel.js'
import { sendResponse } from "../utils/response.js";

export const sendNotifications = async (req, res) => {
    try {
        const { title, body, icon, url } = req.body;
        const payLoad = JSON.stringify({
            title: title || 'Notification',
            body: body || 'You have a new update!',
            icon: icon || "/icons/icon-192x192.png",
            url: url || '/'
        })

        const subscriptions = await Subscription.find()

        await Promise.all(
            subscriptions.map(async sub => {
                try {
                    await webpush.sendNotification(sub, payLoad);
                } catch (err) {
                    console.error("Push error:", err);
                    if (err.statusCode === 410) {
                        // for removing expired subscription
                        await Subscription.deleteOne({ _id: sub._id });
                    }
                }
            })
        );

        return sendResponse(res, 200, true, 'Notifications Sent SuccesFully')

    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}