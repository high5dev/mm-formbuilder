// ** this is a helper for all payments 
// ** 

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Create Subscription

exports.createSubscription = async (paymentType,isSubscription, paymentDetails) =>{
    try {
        switch (paymentType) {
            case 'stripe':
                
                break;
            case 'nmi':
                
                break;
        
            default:
                break;
        }
    } catch (error) {
        return error
    }
}