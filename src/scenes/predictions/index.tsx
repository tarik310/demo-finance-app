import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetCustomersQuery, useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";
import { kmeans } from "ml-kmeans";

const Predictions = () => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const { data: customerData } = useGetCustomersQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    // Convert revenue data into regression format
    const formatted: Array<DataPoint> = monthData.map(({ revenue }, i) => [i, revenue]);

    // Use Polynomial Regression (Degree 2)
    const regressionLine = regression.polynomial(formatted, { order: 2 });

    return monthData.map(({ month, revenue }, i) => ({
      name: month.substring(0, 3),
      "Actual Revenue": revenue,
      "Regression Line": regressionLine.points[i][1],
      "Predicted Revenue Next Year": regressionLine.predict(i + 12)[1], // Predict future value
    }));
  }, [kpiData]);
  // Step 2: Process Customer Data for Clustering
  const clusteredCustomerData = useMemo(() => {
    if (!customerData) return [];

    // Extract numerical features for clustering
    const featureMatrix = customerData.map(({ totalSpent, purchaseCount }) => [
      totalSpent,
      purchaseCount,
    ]);

    // Run K-Means clustering with 3 clusters
    const kmeansResult = kmeans(featureMatrix, 3, { maxIterations: 100 });

    const clusterLabels = kmeansResult.clusters;

    // Append cluster labels to customer data
    return customerData.map((customer, index) => ({
      ...customer,
      cluster: clusterLabels[index],
    }));
  }, [customerData]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1rem",
      }}
    >
      <DashboardBox style={{ maxWidth: "900px", aspectRatio: "2/1" }} p="1rem">
        <FlexBetween m="1rem 2.5rem" gap="1rem">
          <Box>
            <Typography variant="h3">Revenue and Predictions</Typography>
            <Typography variant="h5">
              Charted revenue and predicted revenue based on a simple polynomial
              regression model
            </Typography>
          </Box>
        </FlexBetween>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `$${value / 1_000_000}M`
                  : value >= 1_000
                  ? `$${value / 1_000}k`
                  : `$${value}`
              }
            >
              <Label
                value="Revenue in USD"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#7c3aed"
              dot={false}
            />
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue Next Year"
              stroke={palette.secondary[600]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox style={{ maxWidth: "900px", aspectRatio: "2/1" }} p="1rem">
        <FlexBetween m="1rem 2.5rem" gap="1rem">
          <Box>
            <Typography variant="h3">Customer Segmentation</Typography>
            <Typography variant="h5">
              Customers grouped by spending behavior using K-Means clustering.
            </Typography>
          </Box>
        </FlexBetween>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 75, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="totalSpent"
              name="Total Spent"
              tickFormatter={(value) => `$${value}`}
            >
              <Label value="Total Spent" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis type="number" dataKey="purchaseCount" name="Purchases">
              <Label value="Purchases" angle={-90} offset={-5} position="insideLeft" />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend verticalAlign="top" />
            {Array.from(new Set(clusteredCustomerData.map((d) => d.cluster))).map(
              (cluster) => (
                <Scatter
                  key={cluster}
                  name={`Cluster ${cluster + 1}`}
                  data={clusteredCustomerData.filter((d) => d.cluster === cluster)}
                  fill={
                    [palette.primary[500], palette.secondary[600], palette.tertiary[500]][
                      cluster
                    ]
                  }
                />
              )
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Box>
  );
};

export default Predictions;
