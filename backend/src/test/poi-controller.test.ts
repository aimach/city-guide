import { getPois, getPoi, createPoi, deletePoi, updatePoi } from "./utils/poi";
import { login } from "./utils/auth";
import { Poi } from "../entities/Poi";
import { getCities } from "./utils/cities";

const adminIdentifiers = {
  email: "admin@mail.fr",
  password: "@Admin3010",
};

const randomUUID = "02f9bc0e-e1b1-41cc-84ca-b02aab75ac4c";

let adminToken: string = "";

let allPois: any[] = [];
let poiCreatedId: string = "";

// create file for formdata
const fileContent = "contenu du fichier";

const blob = new Blob([fileContent], { type: "image/jpeg" });
const mockFile = new File([blob], "image.jpg");

const formdata = new FormData();
formdata.append("name", "Test");
formdata.append("coordinates", "43.6, 1.43");
formdata.append("description", "Test");
formdata.append("address", "1 rue du Test 31000 Test");
formdata.append("phoneNumber", "0123456789");
formdata.append("image", mockFile);
formdata.append("isAccepted", "false");

describe("read pois", () => {
  describe("all", () => {
    it("should return a code 200 and all pois", async () => {
      const res = await getPois();
      const data = await res.json();
      data.forEach((city: Poi) => allPois.push(city));
      expect(res.status).toEqual(200);
    });
  });

  describe("read one poi", () => {
    it("should return a code 200 and the city", async () => {
      const res = await getPoi(allPois[0].id);
      expect(res.status).toEqual(200);
    });

    it("should return a code 404 if id doesn't exist", async () => {
      const res = await getPoi(randomUUID);

      expect(res.status).toEqual(404);
    });
  });
});

describe("create poi", () => {
  it("should return a code 201", async () => {
    const user = await login({
      email: adminIdentifiers.email,
      password: adminIdentifiers.password,
    });
    const data = await user.json();
    adminToken = data.token;

    const allCities = await getCities();
    const cityData = await allCities.json();
    formdata.append("city", cityData[0].id);

    const resPoi = await createPoi(adminToken, formdata);
    expect(resPoi.status).toEqual(201);
  });

  it("should return a code 400 if name doesn't matches pattern", async () => {
    formdata.set("name", "a");
    const res = await createPoi(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if address doesn't matches pattern", async () => {
    formdata.set("address", "a");
    const res = await createPoi(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if phoneNumber doesn't matches pattern", async () => {
    formdata.set("phoneNumber", "a");
    const res = await createPoi(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if image is not an object", async () => {
    formdata.set("image", "not an object");
    formdata.set("name", "Test");
    formdata.set("coordinates", "43.6, 1.43");
    formdata.set("description", "Test");
    formdata.set("address", "1 rue du Test 31000 Test");
    formdata.set("phoneNumber", "0123456789");
    formdata.set("isAccepted", "false");
    const res = await createPoi(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe("An image is required");
  });
});

describe("update poi", () => {
  it("should return a code 400 if name doesn't matches pattern", async () => {
    const getAllPois = await getPois();
    allPois = await getAllPois.json();
    poiCreatedId = allPois[allPois.length - 1].id;
    formdata.set("name", "a");
    const res = await updatePoi(adminToken, formdata, poiCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if address doesn't matches pattern", async () => {
    formdata.set("address", "a");
    const res = await updatePoi(adminToken, formdata, poiCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if phoneNumber doesn't matches pattern", async () => {
    formdata.set("phoneNumber", "a");
    const res = await updatePoi(adminToken, formdata, poiCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 404 if poi not found", async () => {
    formdata.set("image", mockFile);
    formdata.set("name", "Test");
    formdata.set("address", "1 rue du Test 31000 Test");
    formdata.set("phoneNumber", "0123456789");
    const res = await updatePoi(adminToken, formdata, randomUUID);
    const data = await res.json();
    expect(res.status).toEqual(404);
    expect(data.error).toBe("Point of interest not found");
  });
});

describe("delete poi", () => {
  it("should return a code 404 if id is not good", async () => {
    const randomUUID = "02f9bc0e-e1b1-41cc-84ca-b02aab75ac4c";

    const res = await deletePoi(adminToken, randomUUID);
    expect(res.status).toEqual(404);
  });

  it("should return a code 200", async () => {
    const res = await deletePoi(adminToken, poiCreatedId);
    expect(res.status).toEqual(200);
  });
});
