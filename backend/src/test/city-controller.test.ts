import {
  getCities,
  getCity,
  createCity,
  deleteCity,
  updateCity,
} from "./utils/cities";
import { getProfile, deleteUser } from "./utils/profile";
import { login, register } from "./utils/auth";
import { City } from "../entities/City";

const adminIdentifiers = {
  email: "admin@mail.fr",
  password: "@Admin3010",
};

const userGoodIdentifiers = {
  email: "email3@test.fr",
  username: "test3",
  password: "Test123!",
};

const randomUUID = "02f9bc0e-e1b1-41cc-84ca-b02aab75ac4c";

let adminToken: string = "";
let notAdminToken: string = "";

let allCities: any[] = [];
let cityCreatedId: string = "";

// create file for formdata
const fileContent = "contenu du fichier";

const blob = new Blob([fileContent], { type: "image/jpeg" });
const mockFile = new File([blob], "image.jpg");

const formdata = new FormData();
formdata.append("name", "Test");
formdata.append("coordinates", "43.6, 1.43");
formdata.append("image", mockFile);

describe("read cities", () => {
  describe("all", () => {
    it("should return a code 200 and all cities", async () => {
      const res = await getCities();
      const data = await res.json();
      data.forEach((city: City) => allCities.push(city));
      expect(res.status).toEqual(200);
    });
  });

  describe("read one city", () => {
    it("should return a code 200 and the city", async () => {
      const res = await getCity(allCities[0].id);
      expect(res.status).toEqual(200);
    });

    it("should return a code 404 if id doesn't exist", async () => {
      const res = await getCity(randomUUID);

      expect(res.status).toEqual(404);
    });
  });
});

describe("create city", () => {
  it("should return a code 201", async () => {
    const user = await login({
      email: adminIdentifiers.email,
      password: adminIdentifiers.password,
    });
    const data = await user.json();
    adminToken = data.token;
    const resCity = await createCity(adminToken, formdata);
    expect(resCity.status).toEqual(201);
  });

  it("should return a code 403 if user is not admin", async () => {
    const user = await register(userGoodIdentifiers);
    const data = await user.json();
    notAdminToken = data.token;
    const res = await createCity(notAdminToken, formdata);
    expect(res.status).toEqual(403);
  });

  it("should return a code 400 if name doesn't matches pattern", async () => {
    formdata.set("name", "a");
    const res = await createCity(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if image is not an object", async () => {
    formdata.set("name", "not an object");
    formdata.set("image", "not an object");
    const res = await createCity(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe("An image is required");
  });

  it("should return a code 409 if name already exists", async () => {
    formdata.set("name", allCities[0].name);
    formdata.set("image", mockFile);
    const res = await createCity(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(409);
    expect(data.error).toBe("City already exists");
  });

  it("should return a code 409 if coordinates already exists", async () => {
    formdata.set(
      "coordinates",
      `${allCities[0].coordinates.coordinates[0].toString() as string}, ${
        allCities[0].coordinates.coordinates[1].toString() as string
      }`
    );
    formdata.set("image", mockFile);
    const res = await createCity(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(409);
    expect(data.error).toBe("City already exists");
  });
});

describe("update city", () => {
  it("should return a code 403 if user is not admin", async () => {
    const getAllCities = await getCities();
    allCities = await getAllCities.json();
    cityCreatedId = allCities[0].id;
    const res = await updateCity(notAdminToken, formdata, cityCreatedId);
    expect(res.status).toEqual(403);
  });

  it("should return a code 400 if name doesn't matches pattern", async () => {
    formdata.set("name", "a");
    const res = await updateCity(adminToken, formdata, cityCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe("Field must contains only characters");
  });

  it("should return a code 400 if image is not an object", async () => {
    formdata.set("name", "not an object");
    formdata.set("image", "not an object");
    const res = await updateCity(adminToken, formdata, cityCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe("Field image must contains a file");
  });

  it("should return a code 404 if city not found", async () => {
    formdata.set("image", mockFile);
    const res = await updateCity(adminToken, formdata, randomUUID);
    const data = await res.json();
    expect(res.status).toEqual(404);
    expect(data.error).toBe("City not found");
  });

  it("should return a code 409 if name already exists", async () => {
    formdata.set("name", allCities[allCities.length - 1].name);
    formdata.set("image", mockFile);

    const res = await updateCity(adminToken, formdata, cityCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(409);
    expect(data.error).toBe("City already exists");
  });

  it("should return a code 409 if coordinates already exists", async () => {
    formdata.set(
      "coordinates",
      `${allCities[0].coordinates.coordinates[0].toString() as string}, ${
        allCities[0].coordinates.coordinates[1].toString() as string
      }`
    );
    formdata.set("image", mockFile);
    const res = await updateCity(adminToken, formdata, cityCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(409);
    expect(data.error).toBe("City already exists");
  });
});

describe("delete city", () => {
  it("should return a code 404 if id is not good", async () => {
    const randomUUID = "02f9bc0e-e1b1-41cc-84ca-b02aab75ac4c";

    const res = await deleteCity(adminToken, randomUUID);
    expect(res.status).toEqual(404);
  });

  it("should return a code 403 if user is not authorized to delete the profile", async () => {
    const res = await deleteCity(notAdminToken, cityCreatedId);
    expect(res.status).toEqual(403);
  });

  it("should return a code 200", async () => {
    const res = await deleteCity(adminToken, cityCreatedId);
    expect(res.status).toEqual(200);
  });
});

// delete user created for tests
describe("delete user", () => {
  it("should return a code 200 if user is authentified", async () => {
    const profile = await getProfile(notAdminToken);
    const userToDelete = await profile.json();

    const res = await deleteUser(userToDelete.id, adminToken);
    expect(res.status).toEqual(200);
  });
});
