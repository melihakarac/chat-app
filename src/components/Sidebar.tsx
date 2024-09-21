import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Drawer,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import routes from "@/routes";
import { logout } from "@/services/auth";
import { clearChatHistory } from "@/services/chat";
import ConfirmationModal from "@/components/ConfirmationModal";

interface SidebarProps {
  onChatRefresh: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatRefresh }) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    clearChatHistory("chatHistory");
    clearChatHistory("chatOpenAIHistory");

    onChatRefresh();
    setIsModalOpen(false);
  };

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          sx={{ position: "fixed", top: "20px", left: "10px", zIndex: 100 }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {isDrawerOpen && isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 50,
          }}
          onClick={() => toggleDrawer(false)}
        />
      )}

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            zIndex: 100,
          },
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Chats
          </Typography>
          <List sx={{ gap: "10px", display: "flex", flexDirection: "column" }}>
            {Object.values(routes)
              .filter((route) => route.sidebar)
              .map((route) => (
                <ListItem
                  key={route.path}
                  component={Link}
                  href={route.path}
                  sx={{
                    backgroundColor:
                      pathname === route.path ? "#e0f7fa" : "transparent",
                    "&:hover": { backgroundColor: "#e0f7fa" },
                  }}
                  onClick={() => toggleDrawer(false)}
                >
                  <ListItemText
                    primary={route.name}
                    sx={{
                      fontWeight: pathname === route.path ? "bold" : "normal",
                    }}
                  />
                </ListItem>
              ))}
          </List>
        </Box>

        <Box>
          <Button
            color="error"
            onClick={handleDeleteClick}
            sx={{ marginBottom: "10px", textAlign: "left" }}
          >
            Delete Chat History
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ marginTop: "auto" }}
          >
            Logout
          </Button>
        </Box>

        <ConfirmationModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Delete Chat History"
          description="Are you sure you want to delete all chat history? This action cannot be undone."
          onConfirm={handleConfirmDelete}
        />
      </Drawer>

      {!isMobile && (
        <Box
          sx={{
            width: "250px",
            padding: "20px",
            borderRight: "1px solid #ccc",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Chats
            </Typography>
            <List
              sx={{ gap: "10px", display: "flex", flexDirection: "column" }}
            >
              {Object.values(routes)
                .filter((route) => route.sidebar)
                .map((route) => (
                  <ListItem
                    key={route.path}
                    component={Link}
                    href={route.path}
                    sx={{
                      backgroundColor:
                        pathname === route.path ? "#e0f7fa" : "transparent",
                      "&:hover": { backgroundColor: "#e0f7fa" },
                    }}
                  >
                    <ListItemText
                      primary={route.name}
                      sx={{
                        fontWeight: pathname === route.path ? "bold" : "normal",
                      }}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>

          <Box>
            <Button
              color="error"
              onClick={handleDeleteClick}
              sx={{ marginBottom: "10px", textAlign: "left" }}
            >
              Delete Chat History
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ marginTop: "auto" }}
            >
              Logout
            </Button>
          </Box>

          <ConfirmationModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Delete Chat History"
            description="Are you sure you want to delete all chat history? This action cannot be undone."
            onConfirm={handleConfirmDelete}
          />
        </Box>
      )}
    </>
  );
};

export default Sidebar;
