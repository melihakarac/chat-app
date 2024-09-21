import { Box } from "@mui/material";
import React from "react";

interface ScrollableContainerProps {
  children: React.ReactNode;
}

export default function ScrollableContainer({
  children,
}: ScrollableContainerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        overflowY: "auto",
        padding: "20px",
        gap: "10px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#b0b0b0",
          borderRadius: "10px",
          border: "2px solid transparent",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#888",
        },
      }}
    >
      {children}
    </Box>
  );
}
