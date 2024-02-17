export const getCategories = async () => {
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/categories`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getCategory = async (id: string) => {
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/categories/${id}`,
    {
      method: "GET",
    }
  );
  return res;
};

export const createCategory = async (token: string, body: FormData) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/categories`,
    {
      method: "POST",
      credentials: "include",
      headers: newHeaders,
      body,
    }
  );

  return res;
};

export const updateCategory = async (
  token: string,
  body: FormData,
  id: string
) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/categories/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: newHeaders,
      body,
    }
  );

  return res;
};

export const deleteCategory = async (token: string, id: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Cookie", `jwt=${token}`);
  const res = await fetch(
    `${process.env.DEPLOY_URL as string}/api/categories/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: newHeaders,
    }
  );

  return res;
};
