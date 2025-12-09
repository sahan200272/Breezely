const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../../server");
const path = require("path");
const fs = require("fs");

let resReg;

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
        resReg = await request(server).post('/api/tasks/create')
            .field("title", "test task")
            .field("note", "test note")
            .field("category", "test category")
            .field("date", "2025-12-07")
            .field("remindDate", "2025-12-10")
            .field("remindTime", "14:23")
            .attach("pdfs", path.join(__dirname, "testFile01.pdf"))

        expect(resReg.status).toBe(200);
        expect(resReg.body.message).toBe("Task created successfully");
        expect(resReg.body).toHaveProperty("task");
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

    it("should update existing task", async () => {

        const res = await request(server).put(`/api/tasks/update/${resReg.body.task._id}`)
            .field("titile", "update title")
            .field("note", "update note")
            .field("category", "update category")
            .field("date", "2025-12-12")
            .field("remindDate", "2025-12-20")
            .field("remindTime", "14:23")
            .attach("pdfs", path.join(__dirname, "updateTest.pdf"))

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Task update success");
    });
    
    it("should retrive all available tasks", async() => {

        const res = await request(server).get('/api/tasks/');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("tasks access success");
        expect(Array.isArray(res.body.tasks)).toBe(true);
    })
});