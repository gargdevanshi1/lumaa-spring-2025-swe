import express from 'express';
// const express = require('express')
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import sequelize from './config/db.config.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

sequelize.sync().then(() => console.log('Database synced'));


app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

export default app;
