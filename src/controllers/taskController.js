const pool = require('../config/db');

const getTasks = async (req, res) => {
  try {
    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener tareas',
      error: error.message
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        message: 'Tarea no encontrada'
      });
    }

    return res.status(200).json(tasks[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener la tarea',
      error: error.message
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'El título es obligatorio'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
      [title, description || null, status || 'pending', req.user.id]
    );

    return res.status(201).json({
      message: 'Tarea creada correctamente',
      taskId: result.insertId
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear tarea',
      error: error.message
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        message: 'Tarea no encontrada'
      });
    }

    const currentTask = tasks[0];

    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
      [
        title || currentTask.title,
        description !== undefined ? description : currentTask.description,
        status || currentTask.status,
        id,
        req.user.id
      ]
    );

    return res.status(200).json({
      message: 'Tarea actualizada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar tarea',
      error: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        message: 'Tarea no encontrada'
      });
    }

    await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    return res.status(200).json({
      message: 'Tarea eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar tarea',
      error: error.message
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
