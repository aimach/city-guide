export type Coordinates = { type: string; coordinates: [number, number] };

export enum Role {
  FREE_USER = "free_user",
  PREMIUM_USER = "premium_user",
  ADMIN = "admin",
  ADMIN_CITY = "admin_city",
  VISITOR = "visitor",
}

export type Message = {
  id: string | null;
  email: string;
  title: string;
  message: string;
};

export type Category = {
  id: string | null;
  name: string;
  image: string;
  poi: Poi[] | null;
};
export type Poi = {
  id: string | null;
  name: string;
  coordinates: Coordinates;
  description: string;
  address: string;
  image: string;
  phoneNumber?: string | null;
  isAccepted?: boolean;
  category: Category;
  city: City;
  user: User;
  usersFavourite?: User[];
};

export type User = {
  id: string | null;
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  role: Role;
  city: string | null;
  createdPoi: Poi[];
  favouritePoi: Poi[];
  favouriteCities: City[];
};

export type City = {
  id: string | null;
  name: string;
  coordinates: Coordinates;
  image: string;
  poi: Poi[] | null;
  users: User[] | null;
  userAdminCity: User | null;
};

export type DataType = City[] | Poi[] | Category[];

export enum CardType {
  POI = "poi",
  CATEGORY = "category",
  CITY = "city",
}

export enum TableType {
  POI = "poi",
  CATEGORY = "category",
  CITY = "city",
  USER = "user",
}
