import { getUserTasks,getUserTaskById, createUserTask, updateUserTask, deleteUserTask } from '../services/task.service.js';

const getTasks = async (req, res) => {
  try {
    const userId = req.body.user.id;
    const tasks = await getUserTasks(userId);
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


const getTaskByID = async (req, res) => {
  try {
    const userId = req.body.user.id;
    const { id } = req.params;
    const task = await getUserTaskById(userId, id);
    return res.json(task);
  } catch (error) {
    if (error.message === 'TASK_NOT_FOUND') {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (error.message === 'USER_UNAUTHORISED') {
      return res.status(404).json({ message: 'User Unauthorised' });
    }
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    const userId = req.body.user.id;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await createUserTask(userId, title, description, isComplete);
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.id;
    const { title, description, isComplete } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await updateUserTask(userId, Number(id), title, description, isComplete);
    return res.json(task);
  } catch (error) {
    if (error.message === 'TASK_NOT_FOUND') {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (error.message === 'USER_UNAUTHORISED') {
      return res.status(404).json({ message: 'User Unauthorised' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.id;
    await deleteUserTask(userId, Number(id));
    return res.json({ message: 'Task deleted' });
  } catch (error) {
    if (error.message === 'TASK_NOT_FOUND') {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (error.message === 'USER_UNAUTHORISED') {
      return res.status(404).json({ message: 'User Unauthorised' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

export default { getTasks, getTaskByID, createTask, updateTask, deleteTask};