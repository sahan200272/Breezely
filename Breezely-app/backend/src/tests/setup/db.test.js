require("dotenv").config();
const db = require("../../config/db");
const mongoose = require("mongoose");

describe("Database Connection", () => {

    // Test to check if the database connection is successful
    it("should connect to the database successfully", async () => {
        await expect(db()).resolves.not.toThrow();
    });

    afterAll(async () => {
        // Close mongoose connection to let Jest exit cleanly
        if (mongoose.connection && (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2)) {
            await mongoose.connection.close(true);
        }
    });
});