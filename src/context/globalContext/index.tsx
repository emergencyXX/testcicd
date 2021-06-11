import React, { useReducer } from "react";
import { ActionTypes, iAction, iGlobalContext, iState } from "../../interfaces";

const initialState:iState = {
  userId: undefined,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  loading: false,
  isFetching: true,
  currentPage: 1,
  users: [],
  totalUserCount: 0,
  pageSize: 5,
  isFollowing: false,
  main: null,
  status: "",
  posts: [],
};

const GlobalContext = React.createContext<iGlobalContext>({
  store: {
    state:initialState,
    dispatch:()=>{},
  },
  constants: ActionTypes,
});

const GlobalProvider: React.FC<React.ReactNode> = (props) => {
  const reducer:React.Reducer<iState, iAction> = (state, action) => {
    switch (action.type) {
      case ActionTypes.SET_USER_DATA:
      
        return {
          ...state,
          ...action.data,
        };
      case ActionTypes.SET_CAPTCHA:
        return {
          ...state,
          captchaUrl: action.captchaUrl,
        };
      case ActionTypes.LOADING_ACTION :
        return {
          ...state,
          loading: action.loading,
        }
      case ActionTypes.TOGGLE_IS_FETCHING :
        return {
          ...state,
          isFetching: action.isFetching,

        }
      case ActionTypes.SET_CURRENT_PAGE :
        return {
          ...state,
          currentPage: action.currentPage,

        }
      case ActionTypes.SET_USERS :
        return {
          ...state,
          users: action.users

        }
      case ActionTypes.SET_TOTAL_USER_COUNT :
        return {
          ...state,
          totalUserCount: action.totalUserCount,

        }
      case ActionTypes.FOLLOW :
        return {
          ...state,
          users: state.users.map(u => {
            if (u.id === action.userId) {
              return {...u, followed: true}
            }
            return u;

          })

        }
      case ActionTypes.UNFOLLOW :
        return {
          ...state,
          users: state.users.map(u => {
            if (u.id === action.userId) {
              return {...u, followed: false}
            }
            return u;

          })

        }
      case ActionTypes.TOGGLE_IS_FOLLOWING :
        return {
          ...state,
          isFollowing: action.isFollowing,

        }
      case ActionTypes.SET_USER_MAIN :
        return {
          ...state,
          main: action.main

        }
      case ActionTypes.SET_STATUS :
        return {
          ...state,
          status: action.status

        }
      case ActionTypes.SET_PHOTO :
        return {
          ...state,
          main: {...state.main, photos: action.photos}

        }
      case ActionTypes.ADD_POST :
        return {
          ...state,
          posts: [...state.posts, {
            id: 5,
            message: action.newPostBody,
            likeCount: 0,
          }],

        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<React.Reducer<iState, iAction>>(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        store: {
          state,
          dispatch,
        },
        constants:ActionTypes,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};