import React from "react";
import { AppBar, Toolbar, Typography,Button } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ title ,currentUser, handleLogout}) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Nguyễn Quang Huy
        </Typography>
        {!currentUser?(<>
        <Typography variant="h5" color="inherit" sx={{marginLeft:"auto"}}>Please Login</Typography>
        </>):(<>
        <Typography variant="h5" color="inherit" sx={{ marginLeft: "auto" }}>
          {title}
        </Typography>
        <Typography>
          Hi {currentUser.first_name}
          </Typography>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </>)}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
