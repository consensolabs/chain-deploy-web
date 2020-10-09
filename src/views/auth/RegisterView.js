import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import data from '../customer/CustomerListView/data';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('CLICKED');

    let data = {
      username: userName,
      email: userEmail,
      password: password
    };

    axios
      .post('https://syndlend-kyc.herokuapp.com/v1/users', data)

      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(userName, userEmail, password);
  };

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                Create new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create new account
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              name="firstName"
              onChange={e => setUserName(e.target.value)}
              value={userName}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onChange={e => setUserEmail(e.target.value)}
              type="email"
              value={userEmail}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              type="password"
              value={password}
              variant="outlined"
            />
            <Box alignItems="center" display="flex" ml={-1}>
              <Checkbox name="policy" />
              <Typography color="textSecondary" variant="body1">
                I have read the
                <Link
                  color="primary"
                  component={RouterLink}
                  to="#"
                  underline="always"
                  variant="h6"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>

            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body1">
              Have an account?
              <Link component={RouterLink} to="/login" variant="h6">
                Sign in
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
