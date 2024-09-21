import { Box } from "@mui/material";
import React from "react";

interface SearchContainerProps {
  children: React.ReactNode;
}

export default function SearchContainer({ children }: SearchContainerProps) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 10,
        paddingBottom: "10px",
        paddingTop: "10px",
        marginBottom: "10px",
        borderBottom: "1px solid #ccc",
        height: "80px",
      }}
    >
      {children}
    </Box>
  );
}
