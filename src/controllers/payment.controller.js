import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          product_data: {
            name: "Laptop",
            description: "Gaming laptop",
          },
          currency: "usd",
          unit_amount: 200000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  return res.json(session);
};

export const success = async (req, res) => {
  res.send("Checkout success");
};

export const cancel = async (req, res) => {
  res.send("Checkout cancelled");
};
