import fs from "fs";

// Read product data from JSON file
const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
const transactions = JSON.parse(fs.readFileSync("transactions.json", "utf8"));

// Helper function to get month name
const getMonthName = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day).toLocaleString("en-US", { month: "long" });
};

// Create product map for quick lookups
const productMap = new Map(products.map((product) => [product._id, product]));

// Aggregate yearly data
const yearlyData = {};

transactions.forEach(({ date, productIds }) => {
  const year = date.split("/")[2];
  if (!yearlyData[year]) {
    yearlyData[year] = {
      _id: year,
      year,
      totalRevenue: 0,
      totalExpenses: 0,
      totalProfit: 0,
      monthlyData: {},
      expensesByCategory: {},
      metaProducts: {
        topQuantitySold: {},
        topProfitProducts: {},
      },
    };
  }

  let monthlyRevenue = 0;
  let monthlyExpenses = 0;
  productIds.forEach(({ productId, quantity }) => {
    const product = productMap.get(productId);
    if (product) {
      const revenue = product.price * quantity;
      const expenses = product.expense * quantity;

      monthlyRevenue += revenue;
      monthlyExpenses += expenses;

      // Track product sales & profit with names
      yearlyData[year].metaProducts.topQuantitySold[productId] = {
        quantity:
          (yearlyData[year].metaProducts.topQuantitySold[productId]?.quantity || 0) +
          quantity,
        name: product.name,
      };

      yearlyData[year].metaProducts.topProfitProducts[productId] = {
        profit:
          (yearlyData[year].metaProducts.topProfitProducts[productId]?.profit || 0) +
          (revenue - expenses),
        name: product.name,
      };
    }
  });

  monthlyRevenue = Number(monthlyRevenue.toFixed(2));
  monthlyExpenses = Number(monthlyExpenses.toFixed(2));

  const monthName = getMonthName(date);
  if (!yearlyData[year].monthlyData[monthName]) {
    yearlyData[year].monthlyData[monthName] = {
      month: monthName,
      revenue: 0,
      expenses: 0,
      operationalExpenses: 0,
      nonOperationalExpenses: 0,
      marketingSpend: 0,
    };
  }
  yearlyData[year].monthlyData[monthName].revenue += monthlyRevenue;
  yearlyData[year].monthlyData[monthName].expenses += monthlyExpenses;
});

// Final calculations and sorting
Object.values(yearlyData).forEach((year) => {
  // Convert monthlyData to sorted array
  const monthOrder = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  year.monthlyData = Object.values(year.monthlyData).sort(
    (a, b) => monthOrder[a.month] - monthOrder[b.month]
  );

  // Process monthly data
  year.monthlyData.forEach((month) => {
    month.revenue = Number(month.revenue.toFixed(2));
    month.expenses = Number(month.expenses.toFixed(2));

    month.operationalExpenses = Number(
      (month.expenses * (Math.random() * 0.45 + 0.3)).toFixed(2)
    );
    month.nonOperationalExpenses = Number(
      (month.expenses - month.operationalExpenses).toFixed(2)
    );
    month.marketingSpend = Number(
      (month.revenue * 0.05 + Math.random() * 1000).toFixed(2)
    );

    year.totalRevenue += month.revenue;
    year.totalExpenses += month.expenses;
  });

  // Calculate yearly totals
  year.totalRevenue = Number(year.totalRevenue.toFixed(2));
  year.totalExpenses = Number(year.totalExpenses.toFixed(2));
  year.totalProfit = Number((year.totalRevenue - year.totalExpenses).toFixed(2));

  // Calculate expense categories
  year.expensesByCategory = {
    salaries: Number((year.totalExpenses * 0.25).toFixed(2)),
    supplies: Number((year.totalExpenses * 0.35).toFixed(2)),
    services: Number((year.totalExpenses * 0.4).toFixed(2)),
  };

  // Process top products
  year.metaProducts.topQuantitySold = Object.entries(year.metaProducts.topQuantitySold)
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, 10)
    .map(([productId, data]) => ({
      productId,
      name: data.name,
      quantity: data.quantity,
    }));

  year.metaProducts.topProfitProducts = Object.entries(
    year.metaProducts.topProfitProducts
  )
    .sort((a, b) => b[1].profit - a[1].profit)
    .slice(0, 10)
    .map(([productId, data]) => ({
      productId,
      name: data.name,
      profit: Number(data.profit.toFixed(2)),
    }));
});

fs.writeFileSync("kpi.json", JSON.stringify(Object.values(yearlyData), null, 2));
console.log("KPI data has been generated successfully!");
