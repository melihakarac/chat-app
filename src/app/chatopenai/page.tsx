"use client";

import { useState } from "react";
import { TextField, Button, Container, Box } from "@mui/material";

import ChatWindow from "@/components/ChatWindow";
import Sidebar from "@/components/Sidebar";
import {
  addUserMessage,
  saveChatHistory,
  loadChatHistory,
} from "@/services/chat";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function ChatOpenAI() {
  const [messages, setMessages] = useState<Message[]>(
    loadChatHistory("chatOpenAIHistory")
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const refreshChat = () => {
    const updatedMessages = loadChatHistory("chatOpenAIHistory");
    setMessages(
      updatedMessages.length > 0
        ? updatedMessages
        : [{ text: "Hello! How can I help you?", sender: "bot" }]
    );
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const updatedMessages = addUserMessage(messages, newMessage);
      setMessages(updatedMessages);
      setNewMessage("");
      setLoading(true);
      saveChatHistory("chatOpenAIHistory", updatedMessages);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage: newMessage }),
        });

        const data = await response.json();
        const botMessage: Message = { text: data.message, sender: "bot" };

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, botMessage];
          saveChatHistory("chatOpenAIHistory", newMessages);
          return newMessages;
        });
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const errorMessage: Message = {
          text: "Error communicating with AI",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", background: "white", height: "100%" }}>
      <Sidebar onChatRefresh={refreshChat} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ChatWindow messages={messages} />
        <Box sx={{ display: "flex", margin: "10px 0" }}>
          <TextField
            label="Type a message..."
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
            sx={{ marginRight: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
