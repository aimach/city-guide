export const getCategories = async () => {
  const res = await fetch("http://backend:5000/api/categories", {
    method: "GET",
  });
  return res;
};
