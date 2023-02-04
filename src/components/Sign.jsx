import React, { useState, useCallback, useEffect } from 'react';
import './auth.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { requestSign } from '../modules/auth';

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

const Sign = () => {
  const [user, setUser] = useState({email: '', password: ''});
  const [validate, setValidate] = useState({email: false, password: false});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('token')) navigate('/todo')
  },[])

  const onEmailChange = useCallback((e)=>{
    const { value } = e.target;
    setUser({...user, email: value});
    if (value.includes('@')){
      setValidate({...validate, email: true});
    } else {
      setValidate({...validate, email: false});
    }
  },[user, validate]);
  const onPasswordChange = useCallback((e)=>{
    const { value } = e.target;
    setUser({...user, password: value});
    if (value.length < 8) {
      setValidate({...validate, password: false});
    } else {
      setValidate({...validate, password: true});
    }
  },[user, validate]);

  const onMove = useCallback((url) => {
    navigate(url, {replace: true});
  },[navigate]);

  const onSign = useCallback((e) => {
    e.preventDefault();
    if (user.email === '') {
      window.alert('아이디를 입력하세요');
      return;
    } 
    if (!user.email.indexOf('@')){
      window.alert('이메일 형식으로 입력하세요');
      return;
    }

    if (user.password === '') {
      window.alert('비밀번호를 입력하세요');
      return;
    }
    if (user.password.length < 9) {
      window.alert('비밀번호를 8자 이상 입력하세요');
      return;
    }
    dispatch(requestSign(user, onMove));
  },[user, dispatch, onMove]);

  return (
    <>
      <header className='auth-header'>
      <h1>회원가입</h1>
      </header>
      <main>
        <form>
          <input type='text' name='email' value={user.email} onChange={onEmailChange} placeholder='아이디를 입력하세요' data-testid="email-input" />
          <div className='auth-text'>이메일 형식으로 입력하세요 <br />(ex. wanted@wanted.com)</div> 
          <input type='password' name='password' value={user.password} onChange={onPasswordChange} autoComplete="off" placeholder='비밀번호를 입력하세요' data-testid="password-input" />
          <div className='auth-text'>8자 이상 입력하세요</div>
          {
            validate.email && validate.password ? <button className='auth-button' onClick={onSign} data-testid="signup-button">회원가입</button> : <button className='auth-button' disabled data-testid="signup-button">회원가입</button>
          }
          
        </form>
        <hr />
        <Link href='/wanted-pre-onboarding-frontend/signin'>로그인</Link>
      </main>
    </>
  );
};

export default Sign;