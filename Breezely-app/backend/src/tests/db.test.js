const db = require("../config/db");

describe("Database Connection", () => {

    // Test to check if the database connection is successful
    it("should connect to the database successfully", async () => {
        await expect(db).resolves.not.toThrow();
    });
});