const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.orderData;
    await data.splice(0, 0, { Order_Date: req.body.order_date });

    // Find the order by email
    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);

    if (!eId) {
      // Create a new order if email does not exist
      const order = await Order.create({
        email: req.body.email,
        orderData: [data],
      });
      res.status(201).send(order);
    } else {
      // Update existing order
      const order = await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { orderData: data },
        },
        { new: true }
      );
      res.status(200).send(order);
    }
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Error creating order");
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    let response = await Order.findOne({ email: req.body.email });
    res.json(response);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});
module.exports = router;
