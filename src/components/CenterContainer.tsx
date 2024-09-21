import { Box } from "@mui/material";
import React from "react";

interface CenterContainerProps {
  children: React.ReactNode;
}

const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

export default CenterContainer;
