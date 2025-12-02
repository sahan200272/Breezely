//Jest test that checks Express server is running and responds to a health check route

const request = require("supertest");
const app = require("../server");

describe("Server Initialization", () => {
  it("should return 200 for the health route", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Server is running");
  });
});
