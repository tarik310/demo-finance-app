import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Row4 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } = useGetKpisQuery();
  const pieChartData = useMemo(() => {
    if (!kpiData) return [];
    return Object.entries(kpiData[0]?.expensesByCategory || {}).map(([key, value]) => ({
      name: key,
      value,
    }));
  }, [kpiData]);
  const TopProfitsProducts = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].metaProducts.topProfitProducts.map(({ productId, profit }) => {
        return {
          name: productId,
          Profit: profit,
        };
      })
    );
  }, [kpiData]);

  const topQuantitySold = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].metaProducts.topQuantitySold.map(({ productId, quantity }) => {
        return {
          name: productId,
          Quantity: quantity,
        };
      })
    );
  }, [kpiData]);
  return (
    <>
      <DashboardBox gridArea="h">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%???" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1rem",
          }}
        >
          <PieChart width={380} height={160}>
            <Pie
              data={pieChartData}
              innerRadius={40}
              outerRadius={60}
              fill={palette.primary[500]}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </Box>
      </DashboardBox>
      <DashboardBox padding="0.8rem" display="flex" alignItems="center" gridArea="i">
        <Typography variant="h4">
          Developed with passion ✨ by{" "}
          <span style={{ color: palette.primary[500] }}>Tareq Harh</span>. 2025
        </Typography>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Top 10 Highest Profit Products"
          subtitle="Graph representing highest profit products"
          sideText="+4%???"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={TopProfitsProducts}
            margin={{
              top: 17,
              right: 20,
              left: -20,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `${value / 1_000_000}M`
                  : value >= 1_000
                  ? `${value / 1_000}k`
                  : value
              }
            />
            <Tooltip />
            <Bar dataKey="Profit" fill="url(#colorProfit)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="k">
        <BoxHeader
          title="Top 10 Highest Selling Products"
          subtitle="Graph representing highest selling products"
          sideText="+4%???"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={topQuantitySold}
            margin={{
              top: 17,
              right: 20,
              left: -20,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary[600]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.secondary[600]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `${value / 1_000_000}M`
                  : value >= 1_000
                  ? `${value / 1_000}k`
                  : value
              }
            />
            <Tooltip />
            <Bar dataKey="Quantity" fill="url(#colorQuantity)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row4;
