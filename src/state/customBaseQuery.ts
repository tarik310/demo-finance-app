// src/api/customBaseQuery.js
import { kpis } from "@/data/kpis";
import { products } from "@/data/products";
import { transactions } from "@/data/transactions";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Create a custom base query that simulates a network delay
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data;
      // args can be a string representing your endpoint
      if (typeof args === "string") {
        if (args === "kpi/kpis/") {
          data = kpis;
        } else if (args === "product/products/") {
          data = products;
        } else if (args === "transaction/transactions/") {
          data = transactions;
        } else {
          // If the endpoint doesn't match any known key, return an error
          resolve({ error: { status: 404, error: "Not Found" } });
          return;
        }
      }
      resolve({ data });
    }, 100); // 1 second delay to simulate network latency
  });
};

export default customBaseQuery;
