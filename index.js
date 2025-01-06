const express = require('express');
const cors = require('cors');
//const { resolve } = require('path');

const app = express();
const port = 3000;
//app.use(express.static('static'));
app.use(cors());

//server side values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; //2 points per Rupees

//http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0
app.get('/cart-total', (request, response) => {
  let newItemPrice = parseFloat(request.query.newItemPrice);
  let cartTotal = parseFloat(request.query.cartTotal);
  let totalValue = newItemPrice + cartTotal;
  response.send(totalValue.toString());
});

//http://localhost:3000/membership-discount?cartTotal=3600&isMember=true

app.get('/membership-discount', (request, response) => {
  let cartTotal = parseFloat(request.query.cartTotal);
  let isMember = request.query.isMember;
  let finalPrice;
  if (isMember === 'true')
    finalPrice = cartTotal - cartTotal * (discountPercentage / 100);
  else finalPrice = cartTotal;
  response.send(finalPrice.toString());
});

//http://localhost:3000/calculate-tax?cartTotal=3600
app.get('/calculate-tax', (request, response) => {
  let cartTotal = parseFloat(request.query.cartTotal);
  let calculateTax = (cartTotal * taxRate) / 100;
  response.send(calculateTax.toString());
});

// http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600

function calculateNoOfDays(shippingMethod, distance) {
  let noOfDays;
  const equalityCheck = (s1,s2)=>s1.toLowerCase()=== s2.toLowerCase();
  //console.log('no of days are' + noOfDays);
  //if (shippingMethod === 'Standard'.to) 
  if(equalityCheck(shippingMethod,'Standard'))
  noOfDays = distance / 50;
  else if (equalityCheck(shippingMethod ,'Express'))
   noOfDays = distance / 100;
  return noOfDays;
}

app.get('/estimate-delivery', (request, response) => {
  let shippingMethod = request.query.shippingMethod;
  let distance = parseFloat(request.query.distance);
  let result  = calculateNoOfDays(shippingMethod, distance);
  response.send(result.toString());
});

/*app.get('/estimate-delivery', (request, response) => {
  let shippingMethod = request.query.shippingMethod;
  let distance = parseFloat(request.query.distance);
  let noOfDays;
  if (shippingMethod === 'Standard') {
    noOfDays = distance / 50.0;
    //console.log('no of days are' + noOfDays);
  } else if (shippingMethod === 'Express') {
    noOfDays = distance / 100.0;
    //console.log('no of days are' + noOfDays);
  }

  response.send(noOfDays.toString());
});
*/

// http://localhost:3000/shipping-cost?weight=2&distance=600

app.get('/shipping-cost', (request, response) => {
  let weight = parseFloat(request.query.weight);
  let distance = parseFloat(request.query.distance);
  let shippingCost = weight * distance * 0.1;
  response.send(shippingCost.toString());
});

// /loyalty-points?purchaseAmount=3600
app.get('/loyalty-points', (request, response) => {
  let purchaseAmount = parseFloat(request.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  response.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
