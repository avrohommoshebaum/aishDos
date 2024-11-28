import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleCloseAlert = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('/register', {
        email: form.email,
        username: form.username,
        password: form.password
      });
      console.log('User registered:', response.data);
      setSuccessMessage('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        if (error.response.data.error.includes('username')) {
          setErrorMessage('Username is already in use. Please choose a different username.');
        } else if (error.response.data.error.includes('email')) {
          setErrorMessage('Email is already in use. Please use a different email.');
        } else {
          setErrorMessage('An error occurred during registration.');
        }
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Register
          </Typography>
          {successMessage ? (
            <Box>
              <Alert severity="success" onClose={handleCloseAlert} sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
              <Button component={Link} to="/" variant="contained" color="primary">
                Go to Login
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
              {errorMessage && (
                <Alert severity="error" onClose={handleCloseAlert} sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </form>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Register;
