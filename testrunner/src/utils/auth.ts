export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://backend:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return res;
};

export const register = async ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const res = await fetch("http://backend:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      username,
    }),
  });
  return res;
};

export const logout = async (token: string) => {
  const res = await fetch("http://backend:5000/api/auth/logout", {
    method: "GET",
    headers: { credentials: "include" },
  });
  return res;
};
