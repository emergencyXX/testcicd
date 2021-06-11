interface iUser {
  name: string;
  id: string;
  uniqueUrlName: string;
  photos: {
    large: string | null;
    small: string | null;
  };
  status: string | null;
  location: string | null;
  followed: boolean;
}

interface iPost {
  id: number;
  message: string;
  likeCount: number;
}

export interface iAction {
  type: ActionTypes;
  [key: string]: any;
}

export interface iMain {
  aboutMe: string;
  contacts: {
    [key: string]: string | null;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    large: string;
    small: string;
  };
}

export interface iState {
  userId: string | undefined;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
  loading: boolean;
  isFetching: boolean;
  currentPage: number | null;
  users: iUser[];
  totalUserCount: number;
  pageSize: number;
  isFollowing: boolean;
  main: iMain | null;
  status: string;
  posts: iPost[];
}

export interface iConstants {
  [key: string]: ActionTypes;
}

export interface iStore {
  state: iState;
  dispatch: (action: iAction) => void;
}

export interface iGlobalContext {
  store: iStore;
  constants: iConstants;
}

export enum ActionTypes {
  SET_USER_DATA = "auth/SET_USER_DATA",
  SET_CAPTCHA = "auth/SET_CAPTCHA",
  LOADING_ACTION = "auth/LOADING_ACTION",
  TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_USERS = "SET_USERS",
  SET_TOTAL_USER_COUNT = "SET_TOTAL_USER_COUNT",
  TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING",
  FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW",
  SET_USER_MAIN = "SET_USER_MAIN",
  SET_STATUS = "SET_STATUS",
  SET_PHOTO = "SET_PHOTO",
  ADD_POST = "ADD-POST",
  SAVE_MAIN_INFO = "SAVE_MAIN_INFO",
}
