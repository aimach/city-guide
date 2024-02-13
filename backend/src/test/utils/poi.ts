export const getPois = async () => {
  const res = await fetch("http://localhost:5000/api/poi", {
    method: "GET",
  });
  return res;
};

export const getPoi = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/poi/${id}`, {
    method: "GET",
  });
  return res;
};

export const createPoi = async (token: string, body: FormData) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://localhost:5000/api/poi`, {
    method: "POST",
    credentials: "include",
    headers: newHeaders,
    body,
  });

  return res;
};

export const updatePoi = async (token: string, body: FormData, id: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://localhost:5000/api/poi/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: newHeaders,
    body,
  });

  return res;
};

export const deletePoi = async (token: string, id: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://localhost:5000/api/poi/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: newHeaders,
  });

  return res;
};
