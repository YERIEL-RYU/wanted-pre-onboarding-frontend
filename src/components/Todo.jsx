import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faTrash, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faLemon as lemon } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import './todo.css';
import { requestDeleteTodo, requestGetTodoList, requestPostTodo, requestUpdateTodo } from '../modules/todo';

const ItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PlusBtn = styled.div`
  border-radius: 50%;
  background-color: #e46f8a;
  width: 60px;
  height: 60px;
  position: absolute;
  color: white;
  font-size: xxx-large;
  bottom: 9%;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover{
    background-color: #c35d75;
  }
`;
const Checkbox = styled(FontAwesomeIcon)`
  color: #BB2649;
  cursor: pointer;
  margin-right: 10px;
`;
const TodoText = styled.span`
  color: ${props => props.check ? 'gray' : 'black'};
`;
const Btn = styled.button`
  border: none;
  background: none;
  color: ${props => props.col ? props.col : 'gray'};
  cursor: pointer;
  :hover {
    color: ${props => props.hov ? props.hov : '#3e3e3e'}
  }
`;
const PlusContainer = styled.div`
  background-color: #BB2649;
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px; 
`;
const Input = styled.input`
  width: 350px;
`;

const TodoItem = ({todo, token}) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [text, setText] = useState(todo.todo);

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onChecked = useCallback(()=> {
    if(todo.isCompleted) {
      dispatch(requestUpdateTodo(token, todo.id, todo.todo, false));
    } else {
      dispatch(requestUpdateTodo(token, todo.id, todo.todo, true));
    }
  },[todo, dispatch, token]);

  const onDelete = () => {
    dispatch(requestDeleteTodo(token, todo.id))
  };

  const onUpdateToggle = () => {
    setUpdate(!update);
    setText(todo.todo);
  }

  const onUpdate = () => {
    if (update) {
      dispatch(requestUpdateTodo(token, todo.id, text, todo.isCompleted));
      onUpdateToggle()
    } else {
      onUpdateToggle()
    }
  }

  return (
    <ItemContainer key={todo.id}>
      <label>
        <input type='checkbox' id="checked" />
        {todo.isCompleted ? <Checkbox icon={faLemon} onClick={()=>onChecked()} /> : <Checkbox icon={lemon} onClick={() => onChecked()} />}
        {update 
          ? <input type='text' value={text} onChange={onTextChange} data-testid="modify-input" /> 
          : <TodoText check>{todo.todo}</TodoText>
        }
        
      </label>
      <div style={{display: 'flex'}}>
        {update ? (
          <>
            <Btn onClick={() => onUpdate()} data-testid="submit-button"><FontAwesomeIcon icon={faPen} /></Btn>
            <Btn onClick={() => onUpdateToggle()} data-testid="cancel-button"><FontAwesomeIcon icon={faXmark} /></Btn>
          </>
        ) : (
          <>
            <Btn onClick={() => onUpdate()} data-testid="modify-button"><FontAwesomeIcon icon={faPen} /></Btn>
            <Btn onClick={() => onDelete()} data-testid="delete-button"><FontAwesomeIcon icon={faTrash} /></Btn>
          </>
        )
      }
      </div>
    </ItemContainer>
  )
}

const Todo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [todo, setTodo] = useState('');
  let token = localStorage.getItem('token');
  const todos = useSelector(state=>state.todo.todos);

  const onTodoChange = useCallback((e)=>{
    setTodo(e.target.value);
  },[]);

  useEffect(()=>{
    if(!localStorage.getItem('token')) navigate('/signin')
  },[]);

  useEffect(()=>{
    dispatch(requestGetTodoList(token));
  },[dispatch, token])

  const onPostTodo = useCallback(()=> {
    dispatch(requestPostTodo(token, todo, setTodo));
  },[todo, dispatch, token])

  return (
    <>
      <div>
        <header>
          <h1>TODO LIST</h1>
        </header>
        <main style={{width: '350px', height: '390px', overflowY: 'scroll', marginBottom: '20px'}}>
          {todos.length !== 0 ? todos.map(todo => <TodoItem todo={todo} token={token}/> ) : null}
        </main>
        <PlusBtn onClick={() => onPostTodo()} data-testid="new-todo-add-button">+</PlusBtn>
      </div>
      <PlusContainer>
        <Input type='text' placeholder='??? ?????? ???????????????' value={todo} onChange={onTodoChange} data-testid="new-todo-input"/>
      </PlusContainer>
    </>
  );
};

export default Todo;