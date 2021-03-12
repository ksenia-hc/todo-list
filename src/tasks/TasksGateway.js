const baseUrl =
  "https://5ffacff987478d0017d9a8a0.mockapi.io/tasks/grom/list-tasks";

export const createTask = (taskData) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create new task");
    }
  });
};

export const fetchTasksList = () => {
  return fetch(baseUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((tasksList) => {
      return tasksList.map(({ _id, ...task }) => ({
        id: _id,
        ...task,
      }));
    });
};

export const updateTask = (taskId, taskData) => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create new task");
    }
  });
};

export const deleteTask = (taskId) => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  });
};
