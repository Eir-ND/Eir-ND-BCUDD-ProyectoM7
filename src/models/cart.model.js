import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      priceID: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      priceDescription: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      img: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
