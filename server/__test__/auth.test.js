const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { hash } = require("../helpers/bcrypt");
const { sequelize } = require("../models");

beforeAll(async () => {
  // seed user
  const users = require("../data/users.json");
  users.forEach(el => {
    el.password = hash(el.password);
    el.updatedAt = el.createdAt = new Date();
  });

  await sequelize.queryInterface.bulkInsert("Users", users, {});

  // access_token
  const payload = {
    id: 1,
    email: "user1@mail.com",
  };

  access_token = signToken(payload);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
});

describe("POST /login (Admin)", () => {
  describe("POST /login - succeed", () => {
    it("should return an object with access_token when login is successful", async () => {
      const body = { email: "user1@mail.com", password: "12345" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(`access_token`, expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    // error if email is not provided
    it("should return an error message when email is not provided", async () => {
      const body = { email: "", password: "12345" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if password is not provided
    it("should return an error message when password is not provided", async () => {
      const body = { email: "admin@mail.com", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if email is invalid / not registered
    it("should return an error message when email is invalid or not registered", async () => {
      const body = { email: "unknown@mail.com", password: "admin123" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if password is wrong / does not match
    it("should return an error message when password is incorrect", async () => {
      const body = { email: "admin@mail.com", password: "wrongpassword" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("POST /register (User)", () => {
  describe("POST /register - succeed", () => {
    it("should be return an object with message when register is successful", async () => {
      const body = { email: "test@mail.com", password: "12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Success Create New User");
      expect(response.body).toHaveProperty("user", expect.any(Object));
    });
  });

  describe("POST /register - fail", () => {
    // error if email is empty
    it("should be return an object with error message when email is empty", async () => {
      const body = { password: "12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if password is empty
    it("should be return an object with error message when password is empty", async () => {
      const body = { email: "user@mail.com" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if email is empty string
    it("should be return an object with error message when email is empty string", async () => {
      const body = { email: "", password: "12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if password is empty string
    it("should be return an object with error message when password is empty string", async () => {
      const body = { email: "user@mail.com", password: "" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if email registered
    it("should be return an object with error message when email is registered", async () => {
      const body = { email: "user1@mail.com", password: "12345" };
      const response = await request(app).post("/register").send(body);
      //   console.log(response);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error if invalid email address
    it("should be return an object with error message when email is invalid", async () => {
      const body = { email: "user1mail.com", password: "12345" };
      const response = await request(app).post("/register").send(body);
      //   console.log(response);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // Error if no access_token is provided
    it("should return an error message when access_token is invalid", async () => {
      const body = { email: "user@mail.com", password: "12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // Error if no access_token is provided
    it("should return an error message when access_token is missing", async () => {
      const body = { email: "user@mail.com", password: "12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
