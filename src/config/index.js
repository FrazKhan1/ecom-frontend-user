export const ENV = {
  serverUrl: process.env.SERVER_URL,
  logOut: function () {
    localStorage.removeItem("token");
  },
};
