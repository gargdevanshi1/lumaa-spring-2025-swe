import { useContext, useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
        const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
        const data = await response.json();
        auth?.login(data.token);
        navigate("/tasks");
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

  const redirectToRegister = () => {
      navigate("/register");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      navigate("/tasks")
    }
  },[])

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Login</Typography>
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
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>
        <Button variant="contained" color="secondary" fullWidth onClick={redirectToRegister} sx={{mt:2}}>Register</Button>
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

export default LoginPage;