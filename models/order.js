import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    orderItems: [
      {
        name: { type: String },
        quantity: { type: Number },
        image: { type: String },
        price: { type: Number },
      },
    ],
    shippingAddress: {
      fullName: { type: String },
      address: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
