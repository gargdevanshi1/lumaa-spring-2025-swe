import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './user.model.js';

class Task extends Model {
  id;
  title;
  description;
  isComplete;
  userId;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "iscomplete"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: "userid"
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: false
  }
);

// Establish relationships
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

export default Task;