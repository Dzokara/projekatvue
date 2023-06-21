import users from "./users.json";

export default {
  state: {
    user: { email: "guest", role: "unauthorized" },
    users: users
  },
  mutations: {
    changeUser(state, newUser) {
      if (!newUser) {
        state.user.email = "guest";
        state.user.role = "unauthorized";
        localStorage.removeItem("user");
      } else {
        state.user.email = newUser.email;
        state.user.role = newUser.role;
      }
    }
  },
  getters: {
    email(state) {
      return state.user.email;
    },
    role(state) {
      return state.user.role;
    },
    users(state) {
      return state.users;
    }
  }
}

