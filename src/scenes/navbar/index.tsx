import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import PredictiveInsightsLogo from "@/assets/PredictiveInsightsLogo";

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <>
      <Box mb="0.25rem" p="0.5rem 0rem" sx={{ display: "flex", gap: "1rem" }}>
        <FlexBetween gap="0.75rem">
          <PredictiveInsightsLogo />
          <Typography variant="h4" fontSize="16px">
            Predictive Insights
          </Typography>
        </FlexBetween>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flex: 1,
            borderLeft: `2px solid ${palette.grey[100]}`,
            alignItems: "center",
            paddingLeft: "1rem",
          }}
        >
          <Box sx={{ "&:hover": { color: palette.primary[600] } }}>
            <Link
              to="/"
              onClick={() => setSelected("dashboard")}
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[500],
                textDecoration: "inherit",
              }}
            >
              Dashboard
            </Link>
          </Box>
          <Box sx={{ "&:hover": { color: palette.primary[600] } }}>
            <Link
              to="/predictions"
              onClick={() => setSelected("predictions")}
              style={{
                color: selected === "predictions" ? "inherit" : palette.grey[500],
                textDecoration: "inherit",
              }}
            >
              Predictions
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
