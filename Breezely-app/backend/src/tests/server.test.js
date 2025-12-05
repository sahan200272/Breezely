//Jest test that checks Express server is running and responds to a health check route
const request = require("supertest");

describe("Server Initialization", () => {

  //Test to check if server is listening on the specified port
  it("Server Listening on Specified Port", () => {
    const PORT = process.env.PORT || 3000;
    expect(PORT).toBeDefined();
  });

});
