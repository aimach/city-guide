import { getCategories, getCategory, createCategory } from "./utils/categories";
import { register, login } from "./utils/auth";

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
const adminUUID = "945dd83a-a823-4d4e-a33f-9776fcd13030	";
const isNotAdminUUID = "1b3b9889-b1a5-4d94-aa2a-f91dd765332b";
const allCategories = new Array();

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
      allCategories.push(data);
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
      const res = await getCategory(allCategories[0][0].id);
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
      const data = await res.json();
      expect(res.status).toEqual(404);
    });
  });
});

describe("create category", () => {
  it("should return a code 201", async () => {
    const user = await login(adminIdentifiers);
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

  it("should return a code 422 if a field is empty", async () => {
    formdata.set("name", "");
    const res = await createCategory(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(422);
    expect(data.error).toBe("Please fill the empty field");
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
    formdata.set("image", "not an object");
    const res = await createCategory(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(400);
    expect(data.error).toBe("Field image must contains a file");
  });

  it("should return a code 409 if name already exists", async () => {
    formdata.set("name", allCategories[0][0].name);
    const res = await createCategory(adminToken, formdata);
    const data = await res.json();
    expect(res.status).toEqual(409);
    expect(data.error).toBe("Category already exists");
  });
});

//   describe("when username is missing", () => {
//     it("should return a code 422 and an error message with username as key", async () => {
//       const res = await register({
//         username: "",
//         email: "email@test.fr",
//         password: "Test123!",
//       });
//       const data = await res.json();
//       expect(res.status).toEqual(422);
//       expect(data.errors).toBeDefined();
//       expect(data.errors.username).toBe("Ce champ est requis");
//     });
//   });

//   describe("when password is missing", () => {
//     it("should return a code 422 and an error message with password as key", async () => {
//       const res = await register({
//         password: "",
//         username: "test",
//         email: "email@test.fr",
//       });
//       const data = await res.json();
//       expect(res.status).toEqual(422);
//       expect(data.errors).toBeDefined();
//       expect(data.errors.password).toBe("Ce champ est requis");
//     });
//   });
// });

// describe("when email is not valid", () => {
//   it("should return a code 401 and an error message", async () => {
//     const res = await register({
//       email: "email@",
//       username: "test1",
//       password: "Test123!",
//     });
//     const data = await res.json();
//     expect(res.status).toEqual(401);
//     expect(data.errors).toBeDefined();
//     expect(data.errors.email).toBe("Cet email est invalide");
//   });
// });

//   it("should return a code 201 and a token", async () => {
//     const res = await register(userGoodIdentifiers);
//     const data = await res.json();
//     expect(res.status).toEqual(201);
//     expect(data.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
//   });
