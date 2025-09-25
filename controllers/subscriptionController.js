import Subscription from '../models/subscriptionModel.js'
import { sendResponse } from '../utils/response.js'

const saveSubscription = async (req, res) => {
    try {
        const subscription = req.body;
        if (!subscription) {
            return sendResponse(res, 400, false, 'Subscription is required')
        }
        await Subscription.create(subscription);
        return sendResponse(res, 200, true, 'Subscription saved SuccessFully')

    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

export default saveSubscription;