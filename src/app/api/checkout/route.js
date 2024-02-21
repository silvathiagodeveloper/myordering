import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { MenuItem } from "@/app/models/MenuItem";
import { Order } from "@/app/models/Order";
import { authOptions } from "../auth/[...nextauth]/route";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req){
  mongoose.connect(process.env.DATABASE_HOST);

  const {cartProducts, address} = await req.json();

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  let stripeLinesItems = [];

  for(const cartProduct of cartProducts){
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;
    if(productInfo.sizes?.length > 0){
      const sizeInfo = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
      productPrice += sizeInfo.price;
    }

    if(cartProduct.ingredients?.length > 0){
      for(const ingredientCart of cartProduct.ingredients) {
        const ingredientInfo = productInfo.ingredients.find(ingredient => ingredient._id.toString() === ingredientCart._id.toString())
        productPrice += ingredientInfo.price;
      };
    }

    stripeLinesItems.push({
      quantity: 1,
      price_data: {
        currency: 'BRL',
        product_data: {
          name: productInfo.name,

        },
        unit_amount: productPrice * 100
      }
    });
  };

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLinesItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'order/'+orderDoc._id.toString(),
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()},
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {amount: 500, currency: 'BRL'}
        }
      }
    ]
  });

  return Response.json(stripeSession.url);
}