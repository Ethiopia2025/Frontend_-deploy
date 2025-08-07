const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions");
dotenv.config();
const stripe = require("stripe")(process.env.SECRET_KEY);

const app = express();

setGlobalOptions({ maxInstances: 10 });

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).json({
      message: "total must be greater than 0",
    });
  }
});


exports.api = onRequest(app);




// const { onInit } = require("firebase-functions/v2/core");
// const { onRequest } = require("firebase-functions/v2/https");

// // Example of a slow initialization task
// function slowInitialization() {
//   // Simulate a long-running operation (e.g., loading a large model, network request).
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Slow initialization complete");
//       resolve("Initialized Value");
//     }, 20000); // Simulate a 20-second delay
//   });
// }
// let initializedValue;

// onInit(async () => {
//   initializedValue = await slowInitialization();
// });

// exports.myFunction = onRequest((req, res) => {
//   // Access the initialized value. It will be ready after the first invocation.
//   res.send(`Value: ${initializedValue}`);
// });
