export const unique = (prefix = "t") => `${prefix}-${Date.now().toString(36).slice(-6)}`;
export const uniqueSuffix = () => {
  return Date.now().toString(36).slice(-5);
};

export const makeLabel = (suffix = "") => {
  const s = suffix || unique("label");
  return {
    name: `Label ${s}`,
  };
};

export const makeStatus = (suffix = "") => {
  const s = suffix || unique("status");
  return {
    name: `Status ${s}`,
    slug: `slug-${s}`,
  };
};

export const makeUser = (suffix = "") => {
  const s = suffix || unique("user");
  return {
    email: `${s}@example.test`,
    name: `FN ${s}`,
    surname: `LN ${s}`,
  };
};

export const makeLoginData = (suffix = "") => {
  const s = suffix || unique("login");
  return {
    username: `User ${s}`,
    password: `pass_${s}`,
  };
};

export const makeTaskData = (suffix = "") => {
  const s = suffix || unique("task");
  return {
    title: `Task ${s}`,
    content: `Content for task ${s}`,
    assigneeOption: Math.floor(Math.random() * 6),
    statusOption: Math.floor(Math.random() * 5),
    labelOption: Math.floor(Math.random() * 5),
  };
};
