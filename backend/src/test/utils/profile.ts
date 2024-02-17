export const getProfiles = async (token: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`${process.env.DEPLOY_URL as string}/api/profile`, {
    method: "GET",
    credentials: "include",
    headers: newHeaders,
  });
  return res;
};

export const getProfile = async (token: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/profile/my-profile`,
    {
      method: "GET",
      credentials: "include",
      headers: newHeaders,
    }
  );
  return res;
};

export const deleteUser = async (id: string, token: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/profile/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: newHeaders,
    }
  );
  return res;
};
