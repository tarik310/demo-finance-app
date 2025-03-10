export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface TopQuantitySold {
  productId: string;
  name: string;
  quantity: number;
}

export interface TopProfitProducts {
  productId: string;
  name: string;
  profit: number;
}

export interface MetaProducts {
  topQuantitySold: Array<TopQuantitySold>;
  topProfitProducts: Array<TopProfitProducts>;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  marketingSpend: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  metaProducts: MetaProducts;
}

export interface GetProductsResponse {
  id: string;
  _id: string;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}
export interface GetCustomersResponse {
  customerName: string;
  totalSpent: number;
  purchaseCount: number;
}
