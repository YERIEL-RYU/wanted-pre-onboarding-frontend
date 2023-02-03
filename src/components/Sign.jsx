import React, { useState, useCallback } from 'react';
import './auth.css';
import styled from 'styled-components';

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
  const [user, setUser] = useState({userid: '', password: ''});

  const onUserChange = useCallback((e)=>{
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  },[user]);

  const onSign = useCallback((e) => {
    e.preventDefault();
    if (user.userid === '') {
      window.alert('아이디를 입력하세요');
      return;
    } 
    if (user.password === '') {
      window.alert('비밀번호를 입력하세요');
      return;
    }
  },[user]);

  return (
    <>
      <header className='auth-header'>
      `<h1>회원가입</h1>
      </header>
      <main>
        <form>
          <input type='text' name='userid' value={user.userid} onChange={onUserChange} placeholder='아이디를 입력하세요' /> 
          <input type='password' name='password' value={user.password} onChange={onUserChange} autoComplete="off" placeholder='비밀번호를 입력하세요' />
          <button className='auth-button' onClick={onSign}>회원가입</button>
        </form>
        <hr />
        <Link href='sign'>로그인</Link>
      </main>
    </>
  );
};

export default Sign;