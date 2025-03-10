import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

const Row2 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  const marketingSpend = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, marketingSpend }) => {
        return {
          name: month.substring(0, 3),
          Marketing: marketingSpend,
        };
      })
    );
  }, [data]);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          Revenue: revenue,
          Expenses: expenses,
        };
      })
    );
  }, [data]);

  const monthlyProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          Profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);
  // Metrics
  const revenueGrowth = useMemo(() => {
    if (!data) return "";
    const monthlyData = data[0].monthlyData;
    // Calculate percentage change between the last two months
    const lastMonth = monthlyData[monthlyData.length - 1].revenue;
    const prevMonth = monthlyData[monthlyData.length - 2].revenue;
    const growth = ((lastMonth - prevMonth) / prevMonth) * 100;
    return `${growth.toFixed(1)}%`;
  }, [data]);
  const profitMargin = useMemo(() => {
    if (!data) return "";
    const monthlyData = data[0].monthlyData;
    // Let's calculate the margin for the latest month
    const { revenue, expenses } = monthlyData[monthlyData.length - 1];
    const profit = revenue - expenses;
    const margin = (profit / revenue) * 100;
    return `MP ${margin.toFixed(1)}%`;
  }, [data]);
  const marketingEfficiency = useMemo(() => {
    if (!data) return "";
    const monthlyData = data[0].monthlyData;
    // Latest month metrics:
    const { revenue, marketingSpend } = monthlyData[monthlyData.length - 1];
    const ratio = (marketingSpend / revenue) * 100;
    return `${ratio.toFixed(1)}%`;
  }, [data]);
  return (
    <>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Revenue growth percentage monthly metrics."
          sideText={revenueGrowth}
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 20,
              left: -20,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor={palette.primary[300]} stopOpacity={0.6} />
                <stop offset="100%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor={palette.secondary[500]} stopOpacity={0.7} />
                <stop offset="100%" stopColor={palette.secondary[500]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
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
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Area
              type="monotone"
              dataKey="Revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="Expenses"
              dot={true}
              stroke={palette.secondary[500]}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Monthly Profit"
          subtitle="Graph the monthly profit and average Margin profit"
          sideText={profitMargin}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={monthlyProfit}
            margin={{
              top: 20,
              right: 20,
              left: -20,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
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
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Profit"
              stroke={palette.tertiary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader
          title="Monthly Marketing Spend"
          subtitle="Graph the monthly marketing spend and Marketing share of Revenue"
          sideText={marketingEfficiency}
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={marketingSpend}
            margin={{
              top: 17,
              right: 20,
              left: -20,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
            <Bar dataKey="Marketing" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
