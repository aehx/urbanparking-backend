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

  test("POST /signup : without required fields", async () => {
    const res = await request(app).post("/users/signup").send({
      username: process.env.TEST_SIGNIN_USERNAME,
      password: process.env.TEST_SIGNIN_PASSWORD,
    });
    expect(res.body.result).toBe(false);
  });

  test("POST /signup : result true with and return userInfos", async () => {
    const userInfos = {
      username: "testUsername",
      email: "test@gmail.com",
      password: "1234",
      firstname: "testFirstname",
      city: "testCity",
      address: "testAddress",
      postal: 1234,
    };

    const res = await request(app).post("/users/signup").send(userInfos);
    expect(res.body.result).toBe(true);
    expect(res.body.username).toBe("testUsername");
    expect(res.body.firstname).toBe("testFirstname");
  });

  test("POST /signin", async () => {
    const res = await request(app).post("/users/signin").send({
      username: "user",
      password: "password",
    });
    expect(res.statusCode).toBe(200);
  });

  test("POST /signin : result true and return userInfos", async () => {
    const res = await request(app).post("/users/signin").send({
      username: process.env.TEST_SIGNIN_USERNAME,
      password: process.env.TEST_SIGNIN_PASSWORD,
    });
    expect(res.body.result).toBe(true);
    expect(res.body.username).toBe(process.env.TEST_SIGNIN_USERNAME);
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
