import axios from "axios";

export const AUTH_INIT = 'auth/AUTH_INIT';

export const authInit = (token) => ({
  type: AUTH_INIT,
  token
});

export const requestLogin = (userData) => {
  return async (dispatch) => {
    axios.post('https://pre-onboarding-selection-task.shop/auth/signin', userData)
    .then(res => {
      console.log(res.data)
      dispatch(authInit(res.data))
      localStorage.setItem('init', true);
    })
    .catch(err => window.alert(err.response.data.message))
  }
};

export const requestSign = (userData, onMove) => {
  console.log(userData)
  return async (dispatch) => {
    axios.post('https://pre-onboarding-selection-task.shop/auth/signup', userData)
    .then(res => {
      window.alert('회원가입 되었습니다.');
      onMove('/');
    })
    .catch(err=> {
      var message = err.response.data.message; 
      window.alert(message)
    })
  }
}

const initialState = {
  init: false,
  token: '',
};

const auth_init = (state, action) => ({
  ...state,
  init: true,
  token: action.token
});

const auth = (state=initialState, action) => {
  switch (action.type) {
    case AUTH_INIT:
      return auth_init(state, action);
    default:
      return state;
  }
};

export default auth;