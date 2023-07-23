import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useAppstore } from './../../appStore';
import InventoryIcon from '@mui/icons-material/Inventory';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Person4Icon from '@mui/icons-material/Person4';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

// Mixin styles for the open and closed states of the drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export default function Sidebar() {

  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppstore((state) => state.dopen);
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
      
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ paddingTop: 0 }}>
          <Accordion sx={{ margin: '0', borderRadius: '0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FlexContainer>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Stock" />
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              <List sx={{ paddingTop: 0 }}>
                {/* Add Stock component */}
                <ListItem disablePadding onClick={() => (navigate("/add_stock"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/add_stock' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Add Stock" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                {/* View Stock component */}
                <ListItem disablePadding onClick={() => (navigate("/view_stock"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/view_stock' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="View Stock" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                {/* Add more components for the "Stock" category here */}
                <ListItem disablePadding onClick={() => (navigate("/stock_report"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/stock_report' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Stock Report" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* View Low Stock component */}
          <ListItem disablePadding onClick={() => (navigate("/view_lowstock"))}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: location.pathname === '/view_lowstock' ? '#e1f5fe' : 'transparent',
              }}
            >
              <ListItemIcon>
                <InventoryIcon /> {/* Use the InventoryIcon for "View Low Stock" */}
              </ListItemIcon>
              <ListItemText primary="View Low Stock" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => (navigate("/view_shortexpiry"))}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: location.pathname === '/view_shortexpiry' ? '#e1f5fe' : 'transparent',
              }}
            >
              <ListItemIcon>
                <InventoryIcon /> {/* Use the InventoryIcon for "View Low Stock" */}
              </ListItemIcon>
              <ListItemText primary="View Short Expiry" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <Accordion sx={{ margin: '0', borderRadius: '0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FlexContainer>
                <ListItemIcon>
                  <BookOnlineIcon /> {/* The BookOnlineIcon for the "Appointments" category */}
                </ListItemIcon>
                <ListItemText primary="Appointments" />
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              {/* Nested List for the components under "Appointments" */}
              <List sx={{ paddingTop: 0 }}>
                {/* Add Appointment component */}
                <ListItem disablePadding onClick={() => (navigate("/add_appointment"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/add_appointment' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Add Appointment" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                {/* View Appointment component */}
                <ListItem disablePadding onClick={() => (navigate("/view_appointment"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/view_appointment' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="View Appointment" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <ListItem disablePadding onClick={() => (navigate("/generate_bill_new"))}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: location.pathname === '/generate_bill_new' ? '#e1f5fe' : 'transparent', // Highlight the active component
              }}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Generate Bill" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {/* ... Add more categories and components here ... */}

          {/* Doctor Management category */}
          <Accordion sx={{ margin: '0', borderRadius: '0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {/* FlexContainer with the icon and label */}
              <FlexContainer>
                <ListItemIcon>
                  <Person4Icon /> {/* The Person4Icon for "Doctor Management" category */}
                </ListItemIcon>
                <ListItemText primary="Doctor Management" />
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              {/* Nested List for the components under "Doctor Management" */}
              <List sx={{ paddingTop: 0 }}>
                {/* Add Doctor component */}
                <ListItem disablePadding onClick={() => (navigate("/add_doctor"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/add_doctor' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Add Doctor" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                {/* View Doctor component */}
                <ListItem disablePadding onClick={() => (navigate("/view_doctors"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/view_doctors' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="View Doctor" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </List>
        <List>
        </List>
      </Drawer>
    </Box>
  );
}
