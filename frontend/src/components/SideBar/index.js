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
import SummarizeIcon from '@mui/icons-material/Summarize';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

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

const CategoryIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(7),
  display: 'flex',
  justifyContent: 'center',
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

const SidebarContent = styled('div')(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  ...(open && {
    '& .MuiAccordion-root': {
      marginBottom: theme.spacing(1),
    },
  }),
  '& .MuiListItem-root': {
    justifyContent: open ? 'initial' : 'center',
    paddingLeft: open ? theme.spacing(2) : theme.spacing(0),
  },
}));

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
        <SidebarContent open={open}>
        <List>
          <Accordion>
            <AccordionSummary expandIcon={open ? <ExpandMoreIcon /> : null} disabled={!open}>
              <FlexContainer>
                <CategoryIcon sx={{ color: '#800080' }}>
                  <InventoryIcon/>
                </CategoryIcon>
                {open && <ListItemText primary="Stock" />}
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ paddingTop: 0 }}>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/add_stock"))}>
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
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/view_stock"))}>
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
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/view_lowstock"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/view_lowstock' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="View Low Stock" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/view_shortexpiry"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/view_shortexpiry' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="View Short Expiry Stock" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/view_expired"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/view_expired' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="View Expired Stock" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/sales_report"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/sales_report' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Stock Sales Report" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>


          <Accordion>
            <AccordionSummary expandIcon={open ? <ExpandMoreIcon /> : null} disabled={!open}>
              <FlexContainer>
                <CategoryIcon sx={{ color: '#800080' }}>
                  <BookOnlineIcon/>
                </CategoryIcon>
                {open && <ListItemText primary="Appointments" />}
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              <List sx={{ paddingTop: 0 }}>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/add_appointment"))}>
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
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/view_appointment"))}>
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


          <Accordion>
            <AccordionSummary expandIcon={open ? <ExpandMoreIcon /> : null} disabled={!open}>
              <FlexContainer>
                <CategoryIcon sx={{ color: '#800080' }}>
                  <Person4Icon/> 
                </CategoryIcon>
                {open && <ListItemText primary="Doctor Management" />}
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              <List sx={{ paddingTop: 0 }}>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/add_doctor"))}>
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
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/view_doctors"))}>
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

          <Accordion>
            <AccordionSummary expandIcon={open ? <ExpandMoreIcon /> : null} disabled={!open}>
              <FlexContainer>
                <CategoryIcon sx={{ color: '#800080' }}>
                  <Person4Icon/> 
                </CategoryIcon>
                {open && <ListItemText primary="Employee Management" />}
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              <List sx={{ paddingTop: 0 }}>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/get_attendance"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/get_attendance' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Get Attendance" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/view_attendance"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/view_attendance' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="View Attendance" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={open ? <ExpandMoreIcon /> : null} disabled={!open}>
              <FlexContainer>
                <CategoryIcon sx={{ color: '#800080' }}>
                  <SummarizeIcon/> 
                </CategoryIcon>
                {open && <ListItemText primary="Reports" />}
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              <List sx={{ paddingTop: 0 }}>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/sales_report"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/sales_report' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Sales Report" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/attendence_report"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/attendence_report' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Attendence Report" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/expiredMed_report"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/expiredMed_report' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Expired Medicine Report" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/profit_report"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/profit_report' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Profit Report" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={open ? <ExpandMoreIcon /> : null} disabled={!open}>
              <FlexContainer>
                <CategoryIcon sx={{ color: '#800080' }}>
                  <PointOfSaleIcon/> 
                </CategoryIcon>
                {open && <ListItemText primary="Sales Management" />}
              </FlexContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              <List sx={{ paddingTop: 0 }}>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} disablePadding onClick={() => (navigate("/generate_bill"))}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === '/generate_bill' ? '#e1f5fe' : 'transparent',
                    }}
                  >
                    <ListItemText primary="Generate Bill" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

        </List>
        </SidebarContent>
        <List>
        </List>
      </Drawer>
    </Box>
  );
}