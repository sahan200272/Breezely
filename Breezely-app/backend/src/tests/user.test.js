const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../server");
const User = require("../models/userModel");

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterEach(async () => {
  // Clear all collections
  await User.deleteMany({});
});

afterAll(async () => {
  // Close DB and stop server
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /api/users/register", () => {
  it("should create a new user successfully", async () => {

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Sahan",
        email: "sahan@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data.email).toBe("sahan@gmail.com");
  });

  it("should not allow duplicate email", async () => {

    await User.create({
      name: "Sahan",
      email: "sahan@gmail.com",
      password: "123456"
    });

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Another",
        email: "sahan@gmail.com",
        password: "999999"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Email already exists");
  });
});
