import { types } from "../actions";

const initialState = {
  tasks: [],
  task: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case types.GET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case types.CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case types.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case types.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};

export default taskReducer;
