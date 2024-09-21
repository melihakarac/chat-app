"use client";

import { useState, useEffect } from "react";
import { Box, TextField, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import {
  loadChatHistory,
  saveChatHistory,
  addUserMessage,
  getBotReply,
} from "@/services/chat";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const router = useRouter();

  const refreshChat = () => {
    const updatedMessages = loadChatHistory("chatHistory");
    setMessages(
      updatedMessages.length > 0
        ? updatedMessages
        : [{ text: "Hello! How can I help you?", sender: "bot" }]
    );
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      refreshChat();
    }
  }, [router]);

  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory("chatHistory", messages);
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = addUserMessage(messages, newMessage);
      setMessages(updatedMessages);
      setNewMessage("");

      getBotReply().then((botMessage) => {
        const newMessages = [...updatedMessages, botMessage];
        setMessages(newMessages);
        saveChatHistory("chatHistory", newMessages);
      });
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
            sx={{ marginRight: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={!newMessage.trim()}
          >
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
