const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("perform CRUD operation", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  test("POST /signup", async () => {
    const res = await request(app).post("/users/signup").send({
      username: "user",
      email: "test@example.com",
      password: "password",
    });
    expect(res.statusCode).toBe(200);
  });

  test("POST /signin", async () => {
    const res = await request(app).post("/users/signup").send({
      username: "user",
      password: "password",
    });
    expect(res.statusCode).toBe(200);
  });

  test("POST /signup : without required fields", async () => {
    const res = await request(app).post("/users/signup").send({
      username: process.env.TEST_SIGNIN_USERNAME,
      password: process.env.TEST_SIGNIN_PASSWORD,
    });
    expect(res.body.result).toBe(false);
  });

  test("POST /signin : empty fields", async () => {
    const res = await request(app).post("/users/signin").send({
      username: process.env.TEST_SIGNIN_USERNAME,
    });
    expect(res.body.result).toBe(false);
  });

  test("GET /favoris", async () => {
    const res = await request(app).get(
      `/users/favoris/${process.env.TEST_FAVORITE_TOKEN}`
    );
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });
});
