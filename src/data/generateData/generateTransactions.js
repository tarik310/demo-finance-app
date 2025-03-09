import fs from "fs";

// Read product data from JSON file
const products = JSON.parse(fs.readFileSync("products.json", "utf8"));

const buyers = [
  "Jorrie Tidswell",
  "Alfonse Surridge",
  "Flem Domenc",
  "Jordain Gilberthorpe",
  "Thelma Christoforou",
  "Mattie Iuorio",
  "Ancell Valerio",
  "Ollie Bolderstone",
  "Audrey Zimmermeister",
  "Sibby Iacovolo",
  "Perry Scarrisbrick",
  "Danika Dearth",
  "Jeddy Juschka",
  "Shelley Ganiford",
  "Inigo Paddeley",
  "Mallorie Handrek",
  "Isadora Hollingsby",
  "Claudetta McNally",
  "Garek Van Halen",
  "Rozanna Lochead",
  "Valerie Dooly",
  "Ronny Dishman",
  "Carita Tampion",
  "Guido Valentine",
  "Kimberley Glassopp",
  "Cloris Vasyushkhin",
  "Chevy Richardet",
  "Ailis Bum",
  "Florance Flook",
  "Agna Tresvina",
  "Lulita Johanssen",
  "Kally Sapshed",
  "Curcio Vaines",
  "Morgen Benettolo",
  "Leanor Game",
  "Del Coveny",
  "Juliette Whiteside",
  "Licha Mewis",
  "Freedman Basnett",
  "Dex Martinat",
  "Mal Hessing",
  "Kenyon Lake",
  "Winifield Ahmed",
  "Stace Igglesden",
  "Jordan Skillern",
  "Yorker Sharphurst",
  "Stormy Timoney",
  "Reginauld Brinicombe",
  "Benedikt Gibbe",
  "Elia Kenningham",
  "Kenyon Harbour",
  "Willabella Bilbrey",
  "Sax Caselli",
  "Burr D'Aulby",
  "Maribeth Quiddinton",
  "Doralia Fogg",
  "Gianna Malkinson",
  "Daria Ramble",
  "Sile Pettinger",
  "Barny Aldrick",
  "Marylee Emanueli",
  "Skell Rumbold",
  "Peg Flattman",
  "Guenna Allonby",
  "Jaquenette Tunnacliffe",
  "Adelind Bloan",
  "Mikaela Murrish",
  "Page Allom",
  "Rafael Haughin",
  "Branden Ossenna",
  "Mattie Eskrigge",
  "Sebastian Bonavia",
  "Moyna O'Growgane",
  "Silvan Leisman",
  "Efren Mabley",
  "Si Aime",
  "Deedee Gebbe",
  "Arlinda Smaile",
  "Jareb Bayle",
  "Kermie Goldhill",
  "Birch Morch",
  "Alvis Rowthorne",
  "Roger Gouldthorpe",
];

function getRandomDate() {
  const start = new Date("2024-01-01");
  const end = new Date("2024-12-25");
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
}

function generateTransactions(numTransactions) {
  const transactions = [];

  for (let i = 1; i <= numTransactions; i++) {
    const selectedProducts = [];
    let totalAmount = 0;
    const numProducts = Math.floor(Math.random() * 8) + 1;

    for (let j = 0; j < numProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const amount = product.price * quantity;
      totalAmount += amount;
      selectedProducts.push({
        productId: product._id,
        quantity,
        amount: parseFloat(amount.toFixed(2)),
      });
    }

    transactions.push({
      _id: i.toString(),
      buyer: buyers[Math.floor(Math.random() * buyers.length)],
      date: getRandomDate(),
      productIds: selectedProducts,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    });
  }

  return transactions;
}

const transactionData = generateTransactions(854);
fs.writeFileSync("transactions.json", JSON.stringify(transactionData, null, 2));
console.log("Transactions generated and saved to transactions.json");
