import { Order } from '../../models/Order';

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  const reqBuffer = await req.text();
  const sig = req.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_SIG;
  let event;
  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret);
  } catch (err) {
    return Response.json(err, {status: 400});
  }

  if(event.type == 'checkout.session.completed'){
    const orderId = event?.data?.object?.metadata?.orderId;
    const paid = event?.data?.object?.payment_status === 'paid';
    if(paid){
      await Order.updateOne({_id: orderId}, {paid});
    }
  }


  return Response.json('ok', {status: 200});
}