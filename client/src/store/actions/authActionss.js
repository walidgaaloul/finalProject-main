import * as types from '../actions/types';

import axios from 'axios';
import setToken from '../setToken';
import moment from 'moment';
import { toggleLoginSignupModal } from './NavActions';




const getTimeToNow = (time) => moment(time).unix() - moment().unix();

export const isAuthenticated = () => {
  return (dispatch, getState) => {
    const { token, expirationDate } = getState().AuthReducer;
    const isValid = getTimeToNow(expirationDate) <= 0;
    return !!(token && isValid);
  };
};


export const authRequest = () => {
    return {
      type: types.AUTH_REQUEST,
    };
  };

  export const authFailure = (error) => {
    return {
      type: types.AUTH_FAIL,
      payload: {
        error,
      },
    };
  };
  

  export const registerUser = (Email, FirstName, LastName, PassWord, Birthday) => async(dispatch)=>{
    dispatch(authRequest());
    try {
      const res = await axios.post(`/register`, {
          Email,
        FirstName,
        LastName,
        PassWord,
        Birthday,
      });
      const { data, config } = res;
      console.log('data')
      dispatch({
          type:types.REGISTER_SUCCESS,
          payload:res.data,
      })
    console.log(data)
      if (data.token) {
       
        dispatch(loginUser(Email, PassWord, false));
      }
    } catch ({ error }) {
      dispatch({ type: types.REGISTER_FAIL, payload: error });
    }
  };
    
//update user 

export const updateUser = (user) => {
   return async(dispatch)=>{
  try {
    let id = localStorage.getItem('userId');
    const res = await axios.put(`/login/updatee_user/${id}`, {
     ...user
    });
    const { data } = res;  
  } catch ({ error }) {
    
    } }
};




/*export const registerUser = (email, firstname, lastname, password, birthday) => (dispatch) => {
    axios.post('/register', {
        email,
        firstname,
        lastname,
        password,
        birthday,
      })
    .then((res) => dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data,
    }))
    .catch((err) => dispatch({
        type:REGISTER_FAIL,
        payload:err.response.data.msg,
        
    }))
    
}*/



export const loadUser = () => (dispatch) => {
    setToken();
    axios.get("/login")
    .then((res) => dispatch({
        type:types.LOAD_USER_SUCCESS,
        payload:res.data,
    }))
    .catch((err) => dispatch({
        type:types.LOAD_USER_FAIL,
        payload:err.response.data.errors,
        

    }))

}

export const loginUser = (email, password, rememberMe) => {
    return async (dispatch, getState) => {
      const modalOpen = getState().NavReducer.modalOpen;
      //dispatch(authRequest());
      try {
        let res = await axios.post('/login', {
        
            Email: email,
            PassWord: password,
        
        });

        const { data } = res;
        //const expirationTime = getTimeToNow(data.expire);
  
        //dispatch(authSuccess(data.token, data.user_id, data.expire));
        
        dispatch ({
            type: types.AUTH_SUCCESS ,
            payload:data
        });

       // dispatch(checkAuthTimeout(expirationTime));
        if (modalOpen) {
          dispatch(toggleLoginSignupModal());
        }
      } catch ({ response }) {
        let error = 'Something went wrong.';
        dispatch(authFailure(error));
      }
    };
  };
  

/*export const loginUser = data => dispatch =>{
    axios.post("/login",data)
    .then(res => dispatch({
        type: types.LOGIN_SUCCESS,
        payload:res.data,
    }))
    .catch((err) => dispatch({
        type:types.LOGIN_FAIL,
        payload:err.response.data.errors,
        

    }))
}
*/



// const dumpUser = {
//   email: 'email1@gmail.com',
//   firstname: 'firstname1',
//   lastname: 'lastname1',
//   password: 'password',
//   birthday: '27/10/1996',
// };

/*
export const registerUser = (Email, FirstName, LastName, PassWord, Birthday) => async(dispatch)=> {
  
    
    dispatch(authRequest());
    try {
      let res = await axios.post(`/register`, {
        Email,
          FirstName,
          LastName,
          PassWord,
          Birthday,
      });
      const { data, config } = res;

      if (data.id) {
        dispatch(loginUser(Email, PassWord, false));
      }
    } catch ({ response }) {
      let error = 'Something went wrong.';
      if (response.status === 400) {
        error = 'User with that email already exists.';
      } else {
      }
      dispatch(authFailure(error));
    }
  };

*/
export const authSuccess = (token, userId, expirationDate) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('expirationDate', expirationDate);

  return {
    type: types.AUTH_SUCCESS,
    payload: {
      token,
      expirationDate,
      userId,
    },
  };
};

const dumpLogin = {
  email: 'email1@gmail.com',
  password: 'password',
};

export const demoLogin = () => {
  return async (dispatch) => {
    dispatch(loginUser(dumpLogin.email, dumpLogin.password, true));
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(authRequest());
    try {
      dispatch(logOut());
      let res = await axios.delete('/tokens');
      if (res.status === 204) {
      } else {
        throw new Error('ERROR');
      }
    } catch ({ response }) {
      let error = 'Something went wrong.';
      dispatch(authFailure(error));
    }
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: types.AUTH_LOGOUT,
  };
};
export const authCheckState = () => {
  return (dispatch, getState) => {
    const { expirationDate, token } = getState().AuthReducer;
    if (token) {
      const expirationTime = getTimeToNow(expirationDate);

      if (!isAuthenticated()) {
        dispatch(logOut());
      } else {
        dispatch(checkAuthTimeout(expirationTime));
      }
    }
  };
};

export const resetToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  //remove token from storage
  return {
    type: types.RESET_TOKEN,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOutUser());
    }, expirationTime * 1000);
  };
};

/*export const logoutUser= () => dispatch => {
    dispatch ({
        type:types.LOGOUT
    })
}*/

  
