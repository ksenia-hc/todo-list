import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateTaskInput from "./CreateTaskInput";
import * as tasksActions from "../tasks.actions";
import { sortedTasksSelector } from "../tasks.selectors";
import Task from "./Task";

const TasksList = ({
  tasks,
  getTasksList,
  updateTask,
  deleteTask,
  createTask,
}) => {
  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <main className="todo-list">
      <CreateTaskInput onCreate={createTask} />
      <ul className="list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            handleTaskStatusChange={updateTask}
            handleTaskDelete={deleteTask}
          />
        ))}
      </ul>
    </main>
  );
};

TasksList.propTypes = {
  getTasksList: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
};

const mapState = (state) => {
  return {
    tasks: sortedTasksSelector(state),
  };
};

const mapDispatch = {
  getTasksList: tasksActions.getTasksList,
  updateTask: tasksActions.updateTask,
  deleteTask: tasksActions.deleteTask,
  createTask: tasksActions.createTask,
};

export default connect(mapState, mapDispatch)(TasksList);
