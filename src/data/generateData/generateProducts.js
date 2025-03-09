import fs from "fs";

function getRandomPrice(min, max) {
  const basePrice = Math.floor(Math.random() * (max - min + 1)) + min;
  const cents = [0.49, 0.99, 0.0][Math.floor(Math.random() * 3)];
  return parseFloat((basePrice + cents).toFixed(2));
}

function getRandomExpense(price) {
  const reductionPercentage = Math.random() * (60 - 40) + 40; // Random between 40% to 60%
  const expense = price * (1 - reductionPercentage / 100);
  const cents = parseFloat((Math.random() * 0.98 + 0.01).toFixed(2));
  return parseFloat((expense + cents).toFixed(2));
}

const products = Array.from({ length: 200 }, (_, i) => {
  const id = i + 1;
  const price = getRandomPrice(3, 250);
  const expense = getRandomExpense(price);
  return {
    _id: id.toString(),
    name: `product-${id}`,
    price,
    expense,
    transactions: [], // Keeping empty for now, can be filled later
  };
});

fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
console.log("products.json file generated successfully!");
