import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { useMediaQuery, useTheme, Link } from '@mui/material';
import { useAppstore } from './../../appStore';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUser } from './../../scripts/userContext';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const AppBar = styled(MuiAppBar, {})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const updateOpen = useAppstore((state) => state.updateOpen);
  const dopen = useAppstore((state) => state.dopen);
  const user = useUser().user;
  const reset = useUser().resetUser;
  const navigate = useNavigate();
  const [isLogoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutConfirmation = () => {
    setLogoutConfirmationOpen(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    setLogoutConfirmationOpen(false);
    reset();
    navigate('/');
  };

  const handleCancelLogout = () => {
    setLogoutConfirmationOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogoutConfirmation}>Logout</MenuItem>
    </Menu>
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'purple' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
          >
            <Box sx={{ display: { xs: 'block', sm: 'none' }, mr: 1 }} />
            <Link
              component={RouterLink}
              to="/dashboard"
              underline="none"
              color="inherit"
            >
              MCMS
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {user && (
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                {user.user_name}
              </Typography>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              {user && (
                <Avatar
                  alt="User Avatar"
                  src={user.image_url}
                />
              )}
            </IconButton>
          </Box>
          {isMobile && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              {user && (
                <Avatar
                  alt="User Avatar"
                  src={user.image_url}
                />
              )}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Dialog
        open={isLogoutConfirmationOpen}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <div id="alert-dialog-description">
            Are you sure you want to log out?
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

