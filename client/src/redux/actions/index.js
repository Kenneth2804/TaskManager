import axios from "axios";
import { useDispatch } from "react-redux";

const URL = "/api"; 

export const types = {
  GET_TASKS: "GET_TASKS",
  GET_TASK: "GET_TASK",
  CREATE_TASK: "CREATE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
};

// Obtener todas las tareas
export const getTasks = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/tasks`);
    dispatch({
      type: types.GET_TASKS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Obtener una tarea específica
export const getTask = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/tasks/${id}`);
    dispatch({
      type: types.GET_TASK,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
  }
};

// Crear una nueva tarea
export const createTask = (taskData) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/tasks`, taskData);
    dispatch({
      type: types.CREATE_TASK,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

// Actualizar una tarea existente
export const updateTask = (id, updates) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL}/tasks/${id}`, updates);
    dispatch({
      type: types.UPDATE_TASK,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Eliminar una tarea
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL}/tasks/${id}`);
    dispatch({
      type: types.DELETE_TASK,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
