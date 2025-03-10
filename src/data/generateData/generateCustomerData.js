import fs from "fs";

// Read transactions.json
const transactions = JSON.parse(fs.readFileSync("transactions.json", "utf8"));

// Process data
const customerMap = new Map();

transactions.forEach((transaction) => {
  const buyer = transaction.buyer;
  const totalAmount = transaction.totalAmount;
  const numberOfPurchases = transaction.productIds.length;

  if (!customerMap.has(buyer)) {
    customerMap.set(buyer, { customerName: buyer, totalSpent: 0, purchaseCount: 0 });
  }

  const customer = customerMap.get(buyer);
  customer.totalSpent += totalAmount;
  customer.purchaseCount += numberOfPurchases;
});

// Convert Map to an array and format totalSpent to 2 decimal places
const customerData = Array.from(customerMap.values()).map((customer) => ({
  customerName: customer.customerName,
  totalSpent: parseFloat(customer.totalSpent.toFixed(2)), // Ensure correct rounding
  purchaseCount: customer.purchaseCount,
}));

// Write to new JSON file
fs.writeFileSync("customerData.json", JSON.stringify(customerData, null, 2));

console.log("✅ Customer data successfully generated in customerData.json");
