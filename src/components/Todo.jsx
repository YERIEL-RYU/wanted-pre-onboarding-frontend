import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faLemon as lemon } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const ItemContainer = styled.div`
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
const Btn = styled.button`
  border: none;
  background: none;
  color: ${props => props.col ? props.col : 'gray'};
  cursor: pointer;
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

const TodoItem = (todo) => {
  return (
    <ItemContainer>
      <div>
        <Btn col={'#BB2649'} ><FontAwesomeIcon icon={lemon} /></Btn>
        <span>test</span>
      </div>
      {/* <div>
        <Btn col={'#BB2649'}><FontAwesomeIcon icon={faLemon} /></Btn>
        <span style={{color: 'gray'}}>test</span>
      </div> */}
      <Btn><FontAwesomeIcon icon={faTrash} /></Btn>
    </ItemContainer>
  )
}

const Todo = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token')) navigate('/signin')
  },[])

  return (
    <>
      <div>
        <header>
          <h1>TODO LIST</h1>
        </header>
        <main style={{width: '350px', height: '390px', overflowY: 'scroll', marginBottom: '20px'}}>
          <TodoItem />
        </main>
        <PlusBtn>+</PlusBtn>
      </div>
      <PlusContainer>
        <Input type='text' placeholder='할 일을 입력하세요'/>
      </PlusContainer>
    </>
  );
};

export default Todo;