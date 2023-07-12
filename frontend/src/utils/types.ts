type Coordinates = [number, number];

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
   image: string | null;
   city: string | null;
   createdPoi: Poi[] | null;
   favouritePoi: Poi[] | null;
   favouriteCities: City[] | null;
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
