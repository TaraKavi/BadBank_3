import React, {useReducer, createContext} from "react";
export const UsersContext = createContext();

const actions = {
  ADD_USER: "ADD_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USERS: "UPDATE_USERS",
  SET_ERROR: "SET_ERROR"
};

const initialState = {
  users:[
    {
      name:'abel',
      email:'abel@mit.edu',
      password:'secret',
      balance:100
    },
    {
      name:'Apples',
      email:'galletakro@gmail.com',
      password:'12345678',
      balance:4000
    }
  ],
  currentUser: null,
  success: false,
  showError: false,
  errorMessage: ""
}

function reducer(state, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, 
        currentUser: action.payload };
    case actions.LOGOUT:
      return { ...state, 
        currentUser: null };
    case actions.UPDATE_USERS:
      return {...state, users: action.payload}
    default:
      throw new Error();
  }
}

const useActions = (state, dispatch) => {
  const addUser = (userInfo) => {
    let currentUser = state.users.find( elem => elem.email === userInfo.email)
    if (currentUser) {
      return { result : false, errorMessage: 'User already exists'};
    }

    dispatch({ type: actions.UPDATE_USERS, payload: [...state.users, userInfo] });
    return {result : true};
  }

  const login = (credentials) => {
    let currentUser = state.users.find( elem => elem.email === credentials.email && elem.password === credentials.password)

    if (!currentUser) {
      return { result : false, errorMessage: 'Invalid credentials'};
    }

    dispatch({ type: actions.LOGIN, payload: credentials.email })
    return { result : true};
  }

  const logout = () => {
    dispatch({ type: actions.LOGOUT})
    return true;
  }

  const deposit = (amount) => {
    let newUsers = state.users.map( element => {
      if (element.email === state.currentUser) {
        element.balance = Math.round(((element.balance + amount) + Number.EPSILON) * 100) / 100
      }
      return element;
    })
    dispatch({ type: actions.UPDATE_USERS, payload: newUsers })
    return {result : true};
  }

  const withDraw = (amount) => {
    let currentUser = state.users.find( elem => elem.email === state.currentUser)

    if (currentUser.balance < amount) {
      return {result : false, errorMessage: 'Not enough funds'}
    }

    let newUsers = state.users.map( element => {
      if (element.email === state.currentUser) {
        element.balance = Math.round(((element.balance - amount) + Number.EPSILON) * 100) / 100
      }
      return element;
    })
    dispatch({ type: actions.UPDATE_USERS, payload: newUsers })

    return {result : true};
  }

  return {
    addUser,
    login,
    logout,
    withDraw,
    deposit
  }

}

export const ContextProvider = (props) => {
  const [usersState, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(usersState, dispatch);
  const value = { usersState, actions };

  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  );
};