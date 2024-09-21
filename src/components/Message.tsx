import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";

interface MessageProps {
  text: string;
  sender: "user" | "bot";
  id?: string;
  searchTerm?: string;
}

const MessageBubble = styled(Box)({
  padding: "8px",
  borderRadius: "10px",
  maxWidth: "70%",
  display: "inline-block",
  wordBreak: "break-word",
});

const UserMessageBubble = styled(MessageBubble)({
  backgroundColor: "rgb(66, 84, 102)",
  color: "#fff",
  alignSelf: "flex-end",
});

const BotMessageBubble = styled(MessageBubble)({
  backgroundColor: "rgb(243, 249, 255)",
  color: "#000",
  alignSelf: "flex-start",
});

const MessageWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const HighlightedText: React.FC<{ text: string; searchTerm: string }> = ({
  text,
  searchTerm,
}) => {
  if (!searchTerm) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return (
    <>
      {parts.map((part, index) => (
        <span
          key={index}
          style={
            part.toLowerCase() === searchTerm.toLowerCase()
              ? {
                  backgroundColor: "yellow",
                  color: "black",
                  fontWeight: "bold",
                }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};

export default function Message({
  text,
  sender,
  id,
  searchTerm,
}: MessageProps) {
  const userAvatarUrl = "/images/user-avatar.png";
  const botAvatarUrl = "/images/bot-avatar.png";

  if (sender === "user") {
    return (
      <MessageWrapper
        sx={{ alignItems: "flex-end", justifyContent: "flex-end" }}
      >
        <UserMessageBubble id={id}>
          <Typography>
            <HighlightedText text={text} searchTerm={searchTerm || ""} />
          </Typography>
        </UserMessageBubble>
        <Avatar alt="User" src={userAvatarUrl} />
      </MessageWrapper>
    );
  }

  return (
    <MessageWrapper
      sx={{ alignItems: "flex-end", justifyContent: "flex-start" }}
    >
      <Avatar alt="Bot" src={botAvatarUrl} />
      <BotMessageBubble id={id}>
        <Typography>
          <HighlightedText text={text} searchTerm={searchTerm || ""} />
        </Typography>
      </BotMessageBubble>
    </MessageWrapper>
  );
}
