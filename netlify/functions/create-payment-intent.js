//require is an older syntax for import
require("dotenv").config();
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

//exports.name is old syntax for exporting a function
exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body); //receives a request that expects an amount value
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        }); //amount value is passed into stripe to make a payment intent in $ with a credit card

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }) //returns paymentIntent to the frontend if successful
        }
    } catch (error) {
        console.log({error});
        return {
            status: 400,
            body: JSON.stringify({ error }) //returns the error if paymentIntent is unsuccessful
        }
    };
};