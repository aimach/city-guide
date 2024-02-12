import {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from "./utils/categories";
import { getProfile, deleteUser } from "./utils/profile";
import { login, register } from "./utils/auth";
import { Category } from "../entities/Category";

const adminIdentifiers = {
  email: "admin@mail.fr",
  password: "@Admin3010",
};

const userGoodIdentifiers = {
  email: "email@test.fr",
  username: "test",
  password: "Test123!",
};

let adminToken: string = "";
let notAdminToken: string = "";

let allCategories: any[] = [];
let categoryCreatedId: string = "";

const fileContent = "contenu du fichier";

const blob = new Blob([fileContent], { type: "image/jpeg" });
const mockFile = new File([blob], "image.jpg");

const formdata = new FormData();
formdata.append("name", "Test");
formdata.append("image", mockFile);

describe("read categories", () => {
  describe("all", () => {
    it("should return a code 200 and all categories", async () => {
      const res = await getCategories();
      const data = await res.json();
      data.forEach((category: Category) => allCategories.push(category));
      expect(res.status).toEqual(200);

      const expectedCategory = {
        id: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
      };

      expect(data).toEqual(expect.arrayContaining([expectedCategory]));
    });
  });

  describe("read one category", () => {
    it("should return a code 200 and the category", async () => {
      const res = await getCategory(allCategories[0].id);
      const data = await res.json();
      expect(res.status).toEqual(200);

      const expectedCategory = {
        id: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
      };

      expect(data).toMatchObject(expectedCategory);
    });

    it("should return a code 404 if id doesn't exist", async () => {
      const randomUUID = "02f9bc0e-e1b1-41cc-84ca-b02aab75ac4c";

      const res = await getCategory(randomUUID);

      expect(res.status).toEqual(404);
    });
  });
});

describe("create category", () => {
  it("should return a code 201", async () => {
    const user = await login({
      email: adminIdentifiers.email,
      password: adminIdentifiers.password,
    });
    const data = await user.json();
    adminToken = data.token;
    const resCategory = await createCategory(adminToken, formdata);
    expect(resCategory.status).toEqual(201);
  });

  it("should return a code 403 if user is not admin", async () => {
    const user = await register(userGoodIdentifiers);
    const data = await user.json();
    notAdminToken = data.token;
    const res = await createCategory(notAdminToken, formdata);
    expect(res.status).toEqual(403);
  });

  it("should return a code 400 if name doesn't matches pattern", async () => {
    formdata.set("name", "a");
    const res = await createCategory(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if image is not an object", async () => {
    formdata.set("name", "not an object");
    formdata.set("image", "not an object");
    const res = await createCategory(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe("Field image must contains a file");
  });

  it("should return a code 409 if name already exists", async () => {
    formdata.set("name", allCategories[0].name);
    formdata.set("image", mockFile);
    const res = await createCategory(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(409);
    expect(data.error).toBe("Category already exists");
  });
});

describe("update category", () => {
  it("should return a code 403 if user is not admin", async () => {
    const getAllCategories = await getCategories();
    allCategories = await getAllCategories.json();
    categoryCreatedId = allCategories[allCategories.length - 1].id;
    const res = await updateCategory(
      notAdminToken,
      formdata,
      categoryCreatedId
    );
    expect(res.status).toEqual(403);
  });

  it("should return a code 400 if name doesn't matches pattern", async () => {
    formdata.set("name", "a");
    const res = await updateCategory(adminToken, formdata, categoryCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe(
      "Field must contains only characters (min: 2, max: 100)"
    );
  });

  it("should return a code 400 if image is not an object", async () => {
    formdata.set("name", "not an object");
    formdata.set("image", "not an object");
    const res = await updateCategory(adminToken, formdata, categoryCreatedId);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe("Field image must contains a file");
  });

  it("should return a code 409 if name already exists", async () => {
    formdata.set("name", allCategories[0].name);
    formdata.set("image", mockFile);

    const res = await updateCategory(adminToken, formdata, categoryCreatedId);
    const data = await res.json();
    console.log(data.error);
    expect(res.status).toEqual(409);
    expect(data.error).toBe("Category name already exist");
  });
});

describe("delete category", () => {
  it("should return a code 404 if id is not good", async () => {
    const randomUUID = "02f9bc0e-e1b1-41cc-84ca-b02aab75ac4c";

    const res = await deleteCategory(adminToken, randomUUID);
    expect(res.status).toEqual(404);
  });

  it("should return a code 403 if user is not authorized to delete the profile", async () => {
    const res = await deleteCategory(notAdminToken, categoryCreatedId);
    expect(res.status).toEqual(403);
  });

  it("should return a code 200", async () => {
    const res = await deleteCategory(adminToken, categoryCreatedId);
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
