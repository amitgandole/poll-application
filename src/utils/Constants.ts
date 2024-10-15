export const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfD44m9BNOi165qaGmWkp1--f2YKw0R56T3g&s";

export const ROLE = {
  ADMIN: {
    value: "admin",
    displayText: "Moderator",
  },
  USER: {
    value: "user",
    displayText: "Employee",
  },
};

export const PATHS = {
  home: "/home",
  login: "/login",
  admin_home: "admin-home",
  user_home: "user-home",
  active_poll: "active-polls",
  create_poll: "create-poll",
  closed_poll: "closed-polls",
};

export const KEY_TO_ROUTE: { [key: string]: string } = {
  "1": "create-poll",
  "2": "active-polls",
  "3": "closed-polls",
  "4": PATHS.home,
};
