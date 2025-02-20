import Task from '../models/task.model.js';

export const getUserTasks = async (userId) => {
  return await Task.findAll({ where: { userId } });
};

export const getUserTaskById = async (userId, id) => {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new Error('TASK_NOT_FOUND');
  }
  if (task.dataValues.userId != userId){
    throw new Error('USER_UNAUTHORISED');
  }
  return task;
};

export const createUserTask = async (userId, title, description, isComplete) => {
  return await Task.create({ title, description, isComplete, userId });
};

export const updateUserTask = async (userId, id, title, description, isComplete) => {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new Error('TASK_NOT_FOUND');
  }
  if (task.dataValues.userId != userId){
    throw new Error('USER_UNAUTHORISED');
  }
  await task.update({ title, description, isComplete });
  return task;
};

export const deleteUserTask = async (userId, id) => {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new Error('TASK_NOT_FOUND');
  }
  if (task.dataValues.userId != userId){
    throw new Error('USER_UNAUTHORISED');
  }
  await task.destroy();
};