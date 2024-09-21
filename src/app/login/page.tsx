"use client";

import { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";

import { login } from "@/services/auth";
import routes from "@/routes";
import CenterContainer from "@/components/CenterContainer";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    const success = login(email, password);

    if (success) {
      router.push(routes.chat.path);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <CenterContainer>
      <Container
        maxWidth="sm"
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && (
          <Typography marginBottom={"8px"} color="error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
      </Container>
    </CenterContainer>
  );
}
