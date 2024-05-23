import request from "supertest";
import userService from "../services/usersServices.js";
import app from "../app.js";
import mongoose from "mongoose";

describe("loginUser", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URL);
    server = app.listen(process.env.PORT || 3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  beforeEach(async () => {
    await userService.deleteUsers();
  });

  test("should return status 200", async () => {
    const signUpData = {
      email: "9Qw5z@example.com",
      password: "123456",
    };
    await request(app).post("/api/users/register").send(signUpData);

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send({
        email: "9Qw5z@example.com",
        password: "123456",
      });

    expect(statusCode).toBe(200);
    expect(body).toEqual({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
      token: expect.any(String),
    });
  });
});
