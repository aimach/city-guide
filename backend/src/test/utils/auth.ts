import dotenv from "dotenv";
dotenv.config();

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
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
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    }
  );
  return res;
};

export const logout = async () => {
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/auth/logout`,
    {
      method: "GET",
    }
  );
  return res;
};
