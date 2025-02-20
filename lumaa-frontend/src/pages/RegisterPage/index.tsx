import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try{    
        const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
        });

        if (response.ok) {
        navigate('/login');
        }
        if (!response.ok) {
            const errorData = await response.json(); // Extract JSON response
            throw new Error(errorData.message); // Use the message from response
        }
    }
    catch(error:any){
        setError(error.message);
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>Register</Button>
        <Button variant="contained" color="secondary" fullWidth onClick={redirectToLogin} sx={{mt:2}}>Login</Button>
      </Box>
        <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
            {error}
        </Alert>
        </Snackbar>
        <Snackbar open={!!success} autoHideDuration={4000} onClose={() => setSuccess(null)}>
        <Alert severity="success" onClose={() => setSuccess(null)}>
            {success}
        </Alert>
        </Snackbar>
    </Container>
  );
};

export default RegisterPage;