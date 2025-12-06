const server = require('../../server');
const mongoose = require('mongoose');
const User = require('../../models/user.model');
const request = require('supertest');
const bcrypt = require("bcrypt");

// create response as global variable so it can use within multiple test suits
let response;

beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI_TEST;
    await mongoose.connect(mongoURI);
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User Register API Tests", () => {

    it("should register a new user", async () => {

        const newUser = new User({
            name: "Test User",
            email: "test@gmail.com",
            familiarHand: "Right",
            password: "test123"
        });

        response = await request(server)
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

    it("password should store as hashed", async() => {

        expect(response.body.user.password).not.toBe("test123");

        const isMatch = await bcrypt.compare("test123", response.body.user.password);
        expect(isMatch).toBe(true);
    })
});

describe("User Update API", () => {

    it("should update user details successfully", async () => {

        const oldUser = {
            name: "old user",
            email: "old@gmail.com",
            familiarHand: "right",
            password: "old123"
        }

        const createdUser = await request(server)
            .post('/api/users/register')
            .send(oldUser);

        const updatedData = {
            name: "Updated Name",
            familiarHand: "left"
        };

        const res = await request(server)
            .put(`/api/users/${createdUser.body.user.id}`)
            .send(updatedData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "User updated successfully");

        // Validate updated fields
        expect(res.body.user).toHaveProperty("name", updatedData.name);
        expect(res.body.user).toHaveProperty("familiarHand", updatedData.familiarHand);
    });

});

describe("Get All Users API Tests", () => {

    it("Should get all users available in DB", async () => {

        const res = await request(server).get('/api/users/get');

        console.log(res.body.users);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Get All users Success");
        expect(Array.isArray(res.body.users)).toBe(true);
    })
});

describe("Get a Singel User API Tests", () => {

    it("Should get a user available in DB", async () => {
        
        const res = await request(server).get(`/api/users/${response.body.user.id}`);

        console.log(res.body.user);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "user access successfully");
    })
})