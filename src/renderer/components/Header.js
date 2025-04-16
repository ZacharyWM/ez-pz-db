import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="div">
            EZ-PZ DB
          </Typography>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            PostgreSQL GUI
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
