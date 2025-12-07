const server = require("../../server");
const User = require("../../models/user.model");
const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {

    const mongoURI = process.env.MONGO_URI_TEST;
    await mongoose.connect(mongoURI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Check Login", () => {

    it("should login success", async () => {

        const loginUser = {
            name: "Login User",
            email: "login@gmail.com",
            familiarHand: "Right",
            password: "login123"
        };

        const user = await request(server).post('/api/users/register').send(loginUser);

        const loginCredentials = {
            email: "login@gmail.com",
            password: "login123"
        }

        const res = await request(server).get('/api/users/login').send(loginCredentials);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "User Found");
        expect(res.body).toHaveProperty("token");  // JWT token returned
    });
});