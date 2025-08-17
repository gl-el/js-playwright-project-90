export const uniquePrefix = (prefix = "t") => `${prefix}-${Date.now().toString(36).slice(-6)}`;
export const uniqueSuffix = () => {
  return Date.now().toString(36).slice(-5);
};

export const makeLabel = (suffix = "") => {
  const s = suffix || uniquePrefix("label");
  return {
    name: `Label ${s}`,
  };
};

export const makeStatus = (suffix = "") => {
  const s = suffix || uniquePrefix("status");
  return {
    name: `Status ${s}`,
    slug: `slug-${s}`,
  };
};

export const makeUser = (suffix = "") => {
  const s = suffix || uniquePrefix("user");
  return {
    email: `${s}@example.test`,
    name: `FN ${s}`,
    surname: `LN ${s}`,
  };
};

export const makeLoginData = (suffix = "") => {
  const s = suffix || uniquePrefix("login");
  return {
    username: `User ${s}`,
    password: `pass_${s}`,
  };
};
