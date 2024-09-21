import { useState, useEffect, useRef } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Message from "./Message";
import SearchContainer from "./SearchContainer";
import ScrollableContainer from "./ScrollableContainer";

interface ChatWindowProps {
  messages: { text: string; sender: "user" | "bot" }[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [matches, setMatches] = useState<number[]>([]);
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
    setSearchTerm("");
    setMatches([]);
    setCurrentMatch(0);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length >= 3) {
      const newMatches = messages
        .map((message, index) =>
          message.text.toLowerCase().includes(term) ? index : -1
        )
        .filter((index) => index !== -1);

      setMatches(newMatches);
      setCurrentMatch(0);
    } else {
      setMatches([]);
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (matches.length > 0) {
      const matchElement = document.getElementById(
        `message-${matches[currentMatch]}`
      );
      if (matchElement) {
        matchElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [matches, currentMatch]);

  const handlePrevMatch = () => {
    if (currentMatch > 0) {
      setCurrentMatch((prevMatch) => prevMatch - 1);
    }
  };

  const handleNextMatch = () => {
    if (currentMatch < matches.length - 1) {
      setCurrentMatch((prevMatch) => prevMatch + 1);
    }
  };

  return (
    <Box>
      <SearchContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          {showSearch && (
            <TextField
              ref={searchInputRef}
              label="Search messages..."
              value={searchTerm}
              onChange={handleSearch}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setSearchTerm("");
                          setMatches([]);
                          setCurrentMatch(0);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ marginRight: "10px" }}
            />
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {matches.length > 0 && (
              <>
                <Typography>{`${currentMatch + 1}/${
                  matches.length
                }`}</Typography>
                <IconButton
                  onClick={handlePrevMatch}
                  disabled={currentMatch === 0}
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextMatch}
                  disabled={currentMatch === matches.length - 1}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </>
            )}

            {matches.length === 0 && searchTerm.length >= 3 && (
              <Typography
                sx={{ marginTop: "10px", textAlign: "right", color: "red" }}
              >
                No matches found
              </Typography>
            )}
            <IconButton
              style={{ marginTop: showSearch ? "0px" : "8px" }}
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </SearchContainer>

      <ScrollableContainer>
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sender={msg.sender}
            id={`message-${index}`}
            searchTerm={matches[currentMatch] === index ? searchTerm : ""}
          />
        ))}
        <div ref={lastMessageRef}></div>
      </ScrollableContainer>
    </Box>
  );
}
