import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "1f9be793-1f8d-42ba-92db-32a7572e4620",
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  follow(userId) {
    return instance.post(`follow/${userId}`);
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
};

export const mainUserAPI = {
  getUserMain(userId) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  getStatusUserMain(userId) {
    return instance.get(`profile/status/${userId}`);
  },

  updateStatusUserMain(status) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(file) {
    const formData = new FormData();
    formData.append("image", file);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  profileDataSave(
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    aboutMe,
    github,
    vk,
    facebook,
    instagram,
    twitter,
    website,
    youtube,
    mainLink
  ) {
        return instance.put(`profile`, {
      fullName,
      lookingForAJob,
      lookingForAJobDescription,
      aboutMe,
      contacts: {
        github,
        vk,
        facebook,
        instagram,
        twitter,
        website,
        youtube,
        mainLink,
      },
    });
  },
};

export const headerAuthAPI = {
  getAuthUserData() {
    return instance.get(`auth/me`);
  },

  loginUser(email, password, rememberMe = true, captcha = null) {
    return instance.post(`auth/login`, {
      email: email,
      password,
      rememberMe,
      captcha,
    });
  },

  logoutUser() {
    return instance.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
