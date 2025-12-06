const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");         // your Express app
const User = require("../../models/user.model");

describe("User Update API", () => {

  let user;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);

    // Create a user to update
    user = await User.create({
      name: "Old Name",
      email: "olduser@example.com",
      familiarHand: "right",
      password: "test123"
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should update user details successfully", async () => {

    const updatedData = {
      name: "Updated Name",
      familiarHand: "left"
    };

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User updated successfully");

    // Validate updated fields
    expect(res.body.user).toHaveProperty("name", updatedData.name);
    expect(res.body.user).toHaveProperty("familiarHand", updatedData.familiarHand);
  });

});
