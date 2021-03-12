import * as tasksGateway from "./TasksGateway";
import { tasksListSelector } from "./tasks.selectors";

export const TASKS_LIST_RECIEVED = "TASKS_LIST_RECIEVED";

export const tasksListRecieved = (tasksList) => {
  return {
    type: TASKS_LIST_RECIEVED,
    payload: {
      tasksList,
    },
  };
};

export const getTasksList = () => {
  return function (dispatch) {
    tasksGateway
      .fetchTasksList()
      .then((tasksList) => dispatch(tasksListRecieved(tasksList)));
  };
};

export const updateTask = (taskId) => {
  const thunkAction = function (dispatch, getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const task = tasksList.find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };
    tasksGateway
      .updateTask(taskId, updatedTask)
      .then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const deleteTask = (taskId) => {
  return function (dispatch) {
    tasksGateway.deleteTask(taskId).then(() => dispatch(getTasksList()));
  };
};

export const createTask = (text) => {
  return function (dispatch) {
    const taskData = {
      text,
      done: false,
      createdDate: new Date().toISOString(),
    };

    tasksGateway.createTask(taskData).then(() => dispatch(getTasksList()));
  };
};
