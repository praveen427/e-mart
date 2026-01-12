const Razorpay = require('razorpay');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const body = JSON.parse(event.body);
  const amount = body.amount;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const options = {
    amount: amount * 100, // paise
    currency: 'INR'
  };

  try {
    const order = await razorpay.orders.create(options);
    return { statusCode: 200, body: JSON.stringify(order) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
