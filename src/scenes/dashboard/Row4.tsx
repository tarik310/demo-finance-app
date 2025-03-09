import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

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
    </>
  );
};

export default Row4;
