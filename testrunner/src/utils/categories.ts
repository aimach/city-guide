export const getCategories = async () => {
  const res = await fetch("http://backend:5000/api/categories", {
    method: "GET",
  });
  return res;
};

export const getCategory = async (id: string) => {
  const res = await fetch(`http://backend:5000/api/categories/${id}`, {
    method: "GET",
  });
  return res;
};

export const createCategory = async (token: string, body: FormData) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(`http://backend:5000/api/categories`, {
    method: "POST",
    credentials: "include",
    headers: newHeaders,
    body: body,
  });
  return res;
};
