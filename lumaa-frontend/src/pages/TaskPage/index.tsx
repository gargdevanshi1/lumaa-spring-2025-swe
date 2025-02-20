import { useState, useEffect, useContext } from 'react';
import { Alert, Container, TextField, Button, Typography, Box, Card, CardContent, Checkbox, IconButton, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import { Delete, Edit, Logout } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
        const response = await fetch('http://localhost:5001/tasks', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
            const errorData = await response.json(); // Extract JSON response
            throw new Error(errorData.message); // Use the message from response
          }
        const data = await response.json();
        setTasks(data);
    }
    catch(error:any){
        setError(error.message);
    }
  };

  const handleAddOrUpdateTask = async () => {
    try {
      const url = editTaskId ? `http://localhost:5001/tasks/${editTaskId}` : 'http://localhost:5001/tasks';
      const method = editTaskId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ title, description, isComplete })
      });
      if (!response.ok) {
        const errorData = await response.json(); // Extract JSON response
        throw new Error(errorData.message); // Use the message from response
      }
      setTitle('');
      setDescription('');
      setIsComplete(false);
      setEditTaskId(null);
      setSuccess("Task saved successfully");
      fetchTasks();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try{
        const response = await fetch(`http://localhost:5001/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          if (!response.ok) {
            const errorData = await response.json(); // Extract JSON response
            throw new Error(errorData.message); // Use the message from response
          }
          setSuccess("Task deleted successfully");
    }
    catch(error:any)
    {
        setError(error.message);
    }
    fetchTasks();
  };

  const onLogout = () => {
    auth?.logout();
    navigate("/login");
  }

  const onClear = () => {
    setTitle('');
    setDescription('');
    setIsComplete(false);
    setEditTaskId(null);
  } 

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>Task Manager</Typography>
          <IconButton onClick={onLogout}>
            <Logout color="secondary" />
          </IconButton>
        </Box>
        <TextField label="Title" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Description" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={isComplete}
              onChange={(e) => setIsComplete(!isComplete)}
            />
            <Typography>Mark as Complete</Typography>
          </Box>
        <Button variant="contained" color="secondary" onClick={onClear}>Clear</Button>
        </Box>
        <Button variant="contained" color="primary" fullWidth onClick={handleAddOrUpdateTask}  sx={{mt:2}}>{editTaskId ? 'Update Task' : 'Add Task'}</Button>
        <List>
          {tasks.map(task => (
            <Card key={task.id} variant="outlined" sx={{ mt: 2, backgroundColor: task.isComplete? "#d5f5e4": "#f5e4e4" }}>
              <CardContent>
                <ListItem>
                  <ListItemText primary={task.title} secondary={task.description} />
                  <IconButton onClick={() => { setEditTaskId(task.id); setTitle(task.title); setDescription(task.description); setIsComplete(task.isComplete) }}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <Delete color="secondary" />
                  </IconButton>
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
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
      </Box>
    </Container>
  );
};

export default TaskPage;