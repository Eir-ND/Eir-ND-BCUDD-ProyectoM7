import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";

import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const userID = req.user.id;
  const foundUser = await User.findOne({ _id: userID });
  const foundCart = await Cart.findById(foudUser.cart).populate({
    path: "products",
  });

  const line_items = foundCart.products.map((e) => {
    return {
      price: e.priceID,
      quantity: e.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ["card"],
    // line_items: [
    //   {
    //     price_data: {
    //       product_data: {
    //         name: "Laptop",
    //         description: "Gaming laptop",
    //       },
    //       currency: "usd",
    //       unit_amount: 200000,
    //     },
    //     quantity: 1,
    //   },
    // ],
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173",
    customer_email: foundUser.email,
  });
  res.json({
    session_url: session.url,
    session: session,
  });
};

export const createOrder = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    res.status(400).send("An issue occurred related to the event");
    return;
  }

  switch (event.type) {
    case "charge.succeeded":
      const paymentIntent = event.data.object;
      const email = paymentIntent.billing_details.email;
      const receiptURL = paymentIntent.receipt_url;
      const receiptID = receiptURL
        .split("/")
        .filter((item) => item)
        .pop();
      const amount = paymentIntent.amount;
      const date_created = paymentIntent.created;

      await User.findOneAndUpdate(
        { email },
        {
          $push: {
            receipts: {
              receiptURL,
              receiptID,
              date_created,
              amount,
            },
          },
        },
        { new: true }
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.send();
};

export const createCart = async (req, res) => {
  const newCart = await Cart.create(req.body);
  res.json({
    cart: newCart,
  });
};

export const getCart = async (req, res) => {
  const userID = req.user.id;
  const foundUser = await User.findOne({ _id: userID });
  const foundCart = await Cart.findOne({ _id: foundUser.cart });

  res.json({
    cart: foundCart,
  });
};

export const editCart = async (req, res) => {
  const userID = req.user.id;
  const foundUser = await User.findOne({ _id: userID });
  const { products } = req.body;
  const updatedCart = await Cart.findByIdAndUpdate(
    foundUser.cart,
    {
      products,
    },
    { new: true }
  );

  res.json({
    msg: "Tu carrito fue actualizado",
    updatedCart,
  });
};
