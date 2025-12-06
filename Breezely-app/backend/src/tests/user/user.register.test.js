const server = require('../../server');
const mongoose = require('mongoose');
const User = require('../../models/user.model');
const request = require('supertest');

beforeAll(async () => {
        const mongoURI = process.env.MONGO_URI_TEST;
        await mongoose.connect(mongoURI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

describe("User API Tests", () => {

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it("should register a new user", async () => {

        const newUser = new User({
            name: "Test User",
            email: "test@gmail.com",
            familiarHand: "right",
            password: "test123"
        });

        const response = await request(server)
            .post('/api/users/register')
            .send({
                name: newUser.name,
                email: newUser.email,
                familiarHand: newUser.familiarHand,
                password: newUser.password
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user).toHaveProperty('name', newUser.name);
        expect(response.body.user).toHaveProperty('email', newUser.email);
        expect(response.body.user).toHaveProperty('familiarHand', newUser.familiarHand);
    });
});