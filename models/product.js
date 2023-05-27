import { Schema, model, models } from "mongoose";


const productSchema = new Schema(
  {
    name: { type: String, required: true }
    // slug: { type: String, required: true, unique: true },
    // category: { type: String, required: true },
    // images: [imageSchema],
    // price: { type: Number, required: true },
    // brand: { type: String, required: true },
    // rating: { type: Number, required: true, default: 0 },
    // numReviews: { type: Number, required: true, default: 0 },
    // countInStock: { type: Number, required: true, default: 0 },
    // description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// const imageSchema = new Schema({
//     image: { type: String },
//   });
  
const Product = models.Product || model("Product", productSchema);
export default Product;
