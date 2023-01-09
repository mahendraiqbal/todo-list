import axios from "axios";
const host = "https://todo.api.devcode.gethired.id/"
export const getAllActivity = () => {
    const url = host + 'activity-groups';
    return axios.get(url)
}

export const addActivity = (body) => {
    const url = host + 'activity-groups';
    return axios.post(url, body)
}

export const getOneActivity = (id) => {
    const url = `${host}activity-groups/${id}`
    // console.log(url);
    return axios.get(url, id)
}

export const addTodoActivity = (body) => {
    const url = `${host}todo-items`
    // console.log('cek url', url)
    return axios.post(url, body, {
    });
};

export const getAllToDoActivity = (id) => {
    const url = `${host}todo-items/${id}`
    console.log('cekcek', url)
    return axios.get(url, id)
};

export const patchTitleActivity = (id, body) => {
    const url = `${host}activity-groups/${id}`
    return axios.patch(url, body, id)
};

export const patchToDoActivity = (id, body) => {
    const url = `${host}todo-items/${id}`
    return axios.patch(url, body, id)
};

export const deleteActivity = (id, body) => {
    const url = `${host}activity-groups/${id}`
    console.log('cek url', url)
    return axios.delete(url, id, body)
};

export const deleteToDoListActivity = (id, body) => {
    const url = `${host}todo-items/${id}`
    return axios.delete(url, id, body)
};