import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import Login from './components/Login';
import Sign from './components/Sign';
import Todo from './components/Todo';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  };
  form {
    border: none;
    display: flex;
    flex-direction: column;
  };
  a {
    text-decoration: none;
    color: black;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  input {
    border: 1px solid gray;
    height: 20px;
    padding: 5px;
    background-color: white;
    margin-bottom: 10px;
    :focus {
      outline: 2px solid #BB2649;
    }
  }
`;
const Container = styled.div`
  background-color: #f0cfC3;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 400px;
  height: 600px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let authInit = useSelector(state=>state.auth.init);
  let token = localStorage.getItem('token');
  const [auth, setAuth] = useState(authInit);

  useEffect(()=>{
    console.log('wanted pre-onboarding frontend 사전과제 Todo List by YERIEL');
    setAuth(localStorage.getItem('token') ? true : false);
  },[]);

  useEffect(()=>{
    if (token) {
      setAuth(true);
      navigate('/todo', {replace: true})
    }else {
      if (location.pathname === '/todo') navigate('/signin')
    }
  },[token, navigate, location]);

  return (
    <Container>
      <GlobalStyle />
      <Box>
      {auth ? (
        <Routes basename="/wanted-pre-onboarding-frontend">
          <Route path="/">
            <Route path="/todo" element={<Todo />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      ) : (
        <Routes basename="/wanted-pre-onboarding-frontend">
          <Route path="/">
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Sign />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      )}
      </Box>
    </Container>
  );
};


const NoMatch = () => {
  return (
    <div>opoos!</div>
  )
}


export default App;