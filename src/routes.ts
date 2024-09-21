const routes = {
  login: {
    name: "Login",
    path: "/login",
    protected: false,
    sidebar: false,
  },
  chat: {
    name: "Chat",
    path: "/chat",
    protected: true,
    sidebar: true,
  },
  chatOpenAI: {
    name: "Chat with OpenAI",
    path: "/chatopenai",
    protected: true,
    sidebar: true,
  },
};

export default routes;
