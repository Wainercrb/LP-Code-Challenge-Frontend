import * as React from "react";

// Material Components
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

// App Routes
import { publicRouterList } from "@/routes";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Load Pro
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {publicRouterList.map(({ path, name }) => (
              <Button
                component={Link}
                to={path}
                key={path}
                sx={{ color: "#fff" }}
              >
                {name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, flex: 1 }}>
        <Toolbar />
        {children}
      </Box>

      <AppBar component="div" position="static">
        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{ padding: 1 }}
        >
          Load Pro Code Challenge
        </Typography>
      </AppBar>
    </Box>
  );
}
