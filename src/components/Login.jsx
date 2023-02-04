import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './auth.css';
import styled from 'styled-components';
import { requestLogin } from '../modules/auth';
import { useNavigate } from 'react-router';

const Link = styled.a`
  color: #BB2649;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  :hover {
    color: #e46f8a;
  }
`;

const Login = () => {
  const [user, setUser] = useState({email: '', password: ''});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')) navigate('/todo')
  },[])

  const onUserChange = useCallback((e)=>{
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  },[user]);

  const onMove = useCallback(()=>{
    navigate('/todo', {replace:true});
  },[navigate])

  const onLogin = useCallback((e) => {
    e.preventDefault();
    if (user.email === '') {
      window.alert('아이디를 입력하세요');
      return;
    } 
    if (user.password === '') {
      window.alert('비밀번호를 입력하세요');
      return;
    }
    dispatch(requestLogin(user, onMove));
  },[user, dispatch, onMove]);

  return (
    <>
      <header className='auth-header'>
      `<h1>login</h1>
      </header>
      <main>
        <form action="/todo">
          <input type='text' name='email' value={user.email} onChange={onUserChange} placeholder='아이디를 입력하세요' data-testid="email-input" /> 
          <input type='password' name='password' value={user.password} onChange={onUserChange} autoComplete="off" placeholder='비밀번호를 입력하세요' data-testid="password-input"/>
          <button className='auth-button' onClick={onLogin} data-testid="signin-button" >Login</button>
        </form>
        <hr />
        <Link href='signup'>회원가입</Link>
      </main>
    </>
  );
};

export default Login;