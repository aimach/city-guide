import { getCategories } from "./utils/categories";

describe("read categories", () => {
  describe("all", () => {
    it("should return a code 200 and all categories", async () => {
      const res = await getCategories();
      const data = await res.json();
      expect(res.status).toEqual(200);

      const expectedCategory = {
        id: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
      };

      expect(data).toEqual(expect.arrayContaining([expectedCategory]));
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
});
