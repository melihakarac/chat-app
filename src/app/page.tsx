"use client";

import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import CenterContainer from "@/components/CenterContainer";
import routes from "@/routes";
import { isLoggedIn } from "@/services/auth";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    if (isLoggedIn()) {
      router.push(routes.chatOpenAI.path);
    } else {
      router.push(routes.login.path);
    }
  };

  return (
    <CenterContainer>
      <Container
        style={{
          textAlign: "center",
          padding: "2rem",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Chat App
        </Typography>
        <Typography variant="body1" paragraph>
          Click below to start chatting with our bot.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRedirect}>
          Go to Chat
        </Button>
      </Container>
    </CenterContainer>
  );
}
