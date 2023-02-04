import axios from "axios";

const instance = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop/',
});

export const TODO_LIST = 'todo/TODO_LIST';

export const todoList = (list) => ({
  type: TODO_LIST,
  list
});

export const requestGetTodoList = (token) => {
  return async (dispatch) => {
    instance.get(`todos`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res=> dispatch(todoList(res.data)))
    .catch(err=> window.alert('Todo List를 불러올 수 없습니다.'))
  }
};

export const requestPostTodo = (token, todo, setTodo) => {
  return async (dispatch) => {
    instance({
      method: 'post',
      url: 'todos',
      data: {todo: todo},
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(requestGetTodoList(token));
      setTodo('')
    })
    .catch(err => window.alert('등록 할 수 없습니다.'))
  }
};

export const requestDeleteTodo = (token, id) => {
  return async (dispatch) => {
    instance({
      method: 'delete',
      url: `todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      window.alert('삭제하였습니다.')
      dispatch(requestGetTodoList(token))
    })
    .catch(err => window.alert('삭제할 수 없습니다.'))
  }
}

const initialState = {
  todos: []
};

const todo_list = (state, action) => ({
  ...state,
  todos: action.list
});

const todo = (state=initialState, action) => {
  switch (action.type) {
    case TODO_LIST:
      
      return todo_list(state, action);
  
    default:
      return state;
  }
};

export default todo;