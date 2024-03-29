import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgimage from './../../images/background.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useUser } from './../../scripts/userContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mcms.mtron.me/">
        MCMS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const setUser = useUser().setUser;
  const reset = useUser().resetUser;
  const [lastActivityTime, setLastActivityTime] = React.useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredEmail = data.get('email');
    const enteredPassword = data.get('password');

  try{
      const response = await fetch('https://mcms_api.mtron.me/user_authenticate', {
        method: 'POST',
        body: JSON. stringify({email: enteredEmail, password: enteredPassword}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok){

        const data = await response.json();
        const { user_type, user_name, image_url } = data;
        
        setUser({ user_name, user_type, image_url });
        setLastActivityTime(new Date());
        navigate('/dashboard', {replace: true});
      } else {
        toast.error('Invalid username of password');
      }
    } catch(error){
      console.error('Error:', error);
    }
  };

  React.useEffect(() => {
    const logoutTimer = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - lastActivityTime.getTime();
      const thirtyMinutes = 30 * 60 * 1000;

      if (timeDifference > thirtyMinutes) {
        reset();
        clearInterval(logoutTimer);
      }
    }, 60000);

    return () => clearInterval(logoutTimer);
  }, [lastActivityTime, setUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgimage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h1"
            paragraph
            sx={{
              fontFamily: 'Roboto',
              WebkitTextStroke: '3px #fff',
              textStroke: '3px #fff',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              textAlign: 'justify',
            }}
          ><center>
            Medical Center Management System
            </center>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor:'#f8e7fe'}}>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <b>MCMS</b><br/>Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="secondary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: 'secondary.main',
                  ':hover': {
                    bgcolor: '#d155f6',
                  },
                }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}