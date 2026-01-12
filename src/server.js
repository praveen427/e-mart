const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_S2w23X4BaInNI6',      // ✅ YOUR TEST KEY
  key_secret: 'j6i04StBHir6rkP0gcdkcryx'        // ✅ YOUR SECRET
});

app.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // paise
      currency: 'INR',
      receipt: 'order_rcptid_' + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log('Razorpay backend running on port 5000');
});
