import { register, login, logout } from "./utils/auth";
import { deleteUser, getProfile, getProfiles } from "./utils/profile";

const userGoodIdentifiers = {
  email: "email@test.fr",
  username: "test",
  password: "Test123!",
};

let token: string = "";

describe("user register", () => {
  describe("when a field is empty", () => {
    describe("when email is mising", () => {
      it("should return a code 422 and an error message with email as key", async () => {
        const res = await register({
          email: "",
          username: "test",
          password: "Test123!",
        });
        const data = await res.json();
        expect(res.status).toEqual(422);
        expect(data.error).toBeDefined();
        expect(data.error.email).toBe("Ce champ est requis");
      });
    });

    describe("when username is missing", () => {
      it("should return a code 422 and an error message with username as key", async () => {
        const res = await register({
          username: "",
          email: "email@test.fr",
          password: "Test123!",
        });
        const data = await res.json();
        expect(res.status).toEqual(422);
        expect(data.error).toBeDefined();
        expect(data.error.username).toBe("Ce champ est requis");
      });
    });

    describe("when password is missing", () => {
      it("should return a code 422 and an error message with password as key", async () => {
        const res = await register({
          password: "",
          username: "test",
          email: "email@test.fr",
        });
        const data = await res.json();
        expect(res.status).toEqual(422);
        expect(data.error).toBeDefined();
        expect(data.error.password).toBe("Ce champ est requis");
      });
    });
  });

  describe("when email is not valid", () => {
    it("should return a code 401 and an error message", async () => {
      const res = await register({
        email: "email@",
        username: "test1",

        password: "Test123!",
      });
      const data = await res.json();
      expect(res.status).toEqual(401);
      expect(data.error).toBeDefined();
      expect(data.error.email).toBe("Cet email est invalide");
    });
  });

  describe("when username is not valid", () => {
    describe("when username is too short", () => {
      it("should return a code 401 and an error message", async () => {
        const res = await register({
          email: "email1@test.fr",
          username: "t",
          password: "Test123!",
        });
        const data = await res.json();
        expect(res.status).toEqual(401);
        expect(data.error).toBeDefined();
        expect(data.error.username).toBe(
          "Le nom d'utilisateur doit contenir entre 3 et 20 caractères sans symboles"
        );
      });
    });

    describe("when username is too long", () => {
      it("should return a code 401 and an error message", async () => {
        const res = await register({
          email: "email1@test.fr",
          username:
            "ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
          password: "Test123!",
        });
        const data = await res.json();
        expect(res.status).toEqual(401);
        expect(data.error).toBeDefined();
        expect(data.error.username).toBe(
          "Le nom d'utilisateur doit contenir entre 3 et 20 caractères sans symboles"
        );
      });
    });

    describe("when username contains a symbol", () => {
      it("should return a code 401 and an error message", async () => {
        const res = await register({
          email: "email1@test.fr",
          username: "test!66",
          password: "Test123!",
        });
        const data = await res.json();
        expect(res.status).toEqual(401);
        expect(data.error).toBeDefined();
        expect(data.error.username).toBe(
          "Le nom d'utilisateur doit contenir entre 3 et 20 caractères sans symboles"
        );
      });
    });
  });

  describe("when all fields are correct", () => {
    it("should return a code 201 and a token", async () => {
      const res = await register(userGoodIdentifiers);
      const data = await res.json();
      expect(res.status).toEqual(201);
      expect(data.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
    });
  });
});

describe("user login", () => {
  describe("when all fields are correct", () => {
    it("should return a code 201 and a token", async () => {
      const res = await login({
        email: userGoodIdentifiers.email,
        password: userGoodIdentifiers.password,
      });
      const data = await res.json();
      expect(res.status).toEqual(201);
      expect(data.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
      token = data.token;
    });

    describe("when email is not valid", () => {
      it("should return a code 400 and an error message", async () => {
        const res = await login({
          email: "email1654684@test.fr",
          password: userGoodIdentifiers.password,
        });
        const data = await res.json();
        expect(res.status).toEqual(400);
        expect(data.error).toBeDefined();
        expect(data.error).toBe("Identifiants incorrects");
      });
    });

    describe("when password is not valid", () => {
      it("should return a code 400 and an error message", async () => {
        const res = await login({
          email: userGoodIdentifiers.email,
          password: "Test123@@@",
        });
        const data = await res.json();
        expect(res.status).toEqual(400);
        expect(data.error).toBeDefined();
        expect(data.error).toBe("Identifiants incorrects");
      });
    });
  });
});

describe("logout user", () => {
  it("should return a code 200", async () => {
    const res = await logout();
    const cookieHeader = res.headers.get("jwt");
    expect(res.status).toEqual(200);
    expect(cookieHeader).toBe(null);
  });
});

describe("delete user", () => {
  it("should return a code 404 if id is not good", async () => {
    const randomUUID = "02f9bc0e-e1b1-41cc-84ca-b02aab75ac4c";

    const res = await deleteUser(randomUUID, token);
    expect(res.status).toEqual(404);
  });

  it("should return a code 403 if user is not authorized to delete the profile", async () => {
    const getAllUsers = await getProfiles(token);
    const users = await getAllUsers.json();

    const res = await deleteUser(users[0].id, token);
    expect(res.status).toEqual(403);
  });

  it("should return a code 200 if user is authentified", async () => {
    const profile = await getProfile(token);
    const userToDelete = await profile.json();

    const res = await deleteUser(userToDelete.id, token);
    expect(res.status).toEqual(200);
  });
});
