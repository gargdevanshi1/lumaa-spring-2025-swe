import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import { AuthContext } from './context/AuthContext';
import { useContext, useState, useEffect } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{isAuthenticated, login, logout }}>
        <Router>
          <AuthWrapper />
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

const AuthWrapper = () => {
  const auth = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tasks" element={auth?.isAuthenticated ? <TaskPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;