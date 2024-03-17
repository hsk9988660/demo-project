import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const cardStyle = {
    maxWidth: 400,
    padding: '16px',
    margin: 'auto',
    marginTop: '100px',
  };

  const textFieldStyle = {
    marginBottom: '16px',
  };

  const handleLogin = async () => {
    try {
      // Make a POST request to your backend login API
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password,
      });

      // Check if login was successful
      if (response.status === 200) {
        // Redirect to the vehicle page on successful login
        router.push('/vehicle');
      } else {
        // Handle invalid credentials
        setError('Invalid email or password');
      }
    } catch (error) {
      // Handle error response from the server
      setError('Error logging in');
    }
  };

  return (
   <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            style={textFieldStyle}
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={textFieldStyle}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
  );
};

export default LoginForm;
