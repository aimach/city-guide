export const getCities = async () => {
  const res = await fetch("http://backend:5000/api/cities", {
    method: "GET",
  });
  return res;
};

export const getCity = async (id: string) => {
  const res = await fetch(`http://backend:5000/api/cities/${id}`, {
    method: "GET",
  });
  return res;
};

export const createCity = async (token: string, body: FormData) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://backend:5000/api/cities`, {
    method: "POST",
    credentials: "include",
    headers: newHeaders,
    body,
  });

  return res;
};

export const updateCity = async (token: string, body: FormData, id: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://backend:5000/api/cities/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: newHeaders,
    body,
  });

  return res;
};

export const deleteCity = async (token: string, id: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://backend:5000/api/cities/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: newHeaders,
  });

  return res;
};
