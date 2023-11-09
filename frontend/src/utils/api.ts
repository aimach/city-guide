import { idText } from "typescript";
import { City } from "./types";

const callRestApi = async (
  method: string,
  path: string,
  body?: any,
  inputHeaders?: Record<string, string>
) => {
  const url = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/${path}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  for (const key in inputHeaders) {
    headers.append(key, inputHeaders[key]);
  }

  try {
    const response = await fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      headers,
      method,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ADD A FAVOURITE CITY

export const addFavouriteCityToUser = async (
  cityId: string,
  userId: string
): Promise<void> => {
  try {
    /*  const data = await callRestApi(
          'POST',
          `/api/profile/fav/city/${userId}/${cityId}`
       ); */

    const response = await fetch(
      `http://localhost:5000/api/profile/fav/city/${userId}/${cityId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: null,
      }
    );
    const data = await response.json();
    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  }
};

// REMOVE A CITY FROM FAVOURITES

export const removeFavouriteCityToUser = async (
  cityId: string,
  userId: string
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/profile/fav/city/${userId}/${cityId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log("delete date", data);
  } catch (error) {
    console.log("delete error", error);
  }
};

// ADD A POI TO FAVOURITE

export const addFavouritePoiToUser = async (poiId: string, userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/profile/fav/poi/${userId}/${poiId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: null,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// REMOVE A POI FROM FAVOURITE

export const removeFavouritePoiToUser = async (
  poiId: string,
  userId: string
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/profile/fav/poi/${userId}/${poiId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("delete error", error);
  }
};

// UPDATE USER

export const updateUserExceptPassword = async (
  id: string,
  body: any
): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/api/profile/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      body: body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("delete error", error);
  }
};

// DELETE USER

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/api/profile/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("delete error", error);
  }
};
