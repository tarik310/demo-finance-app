import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetCustomersResponse,
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";
import customBaseQuery from "./customBaseQuery";

export const api = createApi({
  baseQuery: customBaseQuery,
  //baseQuery:  fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL })
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions", "Customers"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
    getCustomers: build.query<Array<GetCustomersResponse>, void>({
      query: () => "customer/customers/",
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} = api;
