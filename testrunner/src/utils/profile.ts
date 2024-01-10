const fetchMock = require("fetch-mock-jest");

export const getProfiles = async (token: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch("http://backend:5000/api/profile/", {
    method: "GET",
    credentials: "include",
    headers: newHeaders,
  });
  return res;
};

export const getProfile = async (token: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch("http://backend:5000/api/profile/my-profile", {
    method: "GET",
    credentials: "include",
    headers: newHeaders,
  });
  return res;
};

export const deleteUser = async (id: string, token: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://backend:5000/api/profile/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: newHeaders,
  });
  return res;
};
