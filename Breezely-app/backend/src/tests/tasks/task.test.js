const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../../server");
const path = require("path");
const fs = require("fs");

beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI_TEST;
    await mongoose.connect(mongoURI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Check Tasks APIs", () => {

    it("should insert new task successfully with single PDF", async () => {

        console.log(__dirname);

        //send data as form data (not as json)
        const res = await request(server).post('/api/tasks/create')
            .field("title", "test task")
            .field("note", "test note")
            .field("category", "test category")
            .field("date", "2025-12-07")
            .field("remindDate", "2025-12-10")
            .field("remindTime", "14:23")
            .attach("pdfs", path.join(__dirname, "testFile01.pdf"))

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Task created successfully");
        expect(res.body).toHaveProperty("task");
    });

    it("should insert new task successfully with more than one PDFs", async () => {

        //send data as form data (not as json) that's why use field() and attach()<-- this for file upload
        const res = await request(server).post('/api/tasks/create')
            .field("title", "test task")
            .field("note", "test note")
            .field("category", "test category")
            .field("date", "2025-12-07")
            .field("remindDate", "2025-12-10")
            .field("remindTime", "14:23")
            .attach("pdfs", path.join(__dirname, "testFile02.pdf"))
            .attach("pdfs", path.join(__dirname, "testFile03.pdf"))

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Task created successfully");
        expect(res.body).toHaveProperty("task");
    }, 15000);
});