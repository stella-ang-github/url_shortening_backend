const app = require("../../index");
const request = require("supertest");

describe("GET url", () => {
  it("GET url with urlCode, should retrieve the respective url and direct to the url.", async () => {
    const beforeRes = await request(app)
      .post("/api/url/createShortenUrl")
      .query({ actualUrl: "www.google.com" });

    const res = await request(app).get("/" + beforeRes.body.urlCode);

    expect(res.statusCode).toEqual(302);
    expect(res.header.location).toEqual("https://www.google.com/");
  });
});

describe("POST url", () => {
  it("POST url", async () => {
    const res = await request(app)
      .post("/api/url/createShortenUrl")
      .query({ actualUrl: "www.google.com" })
      .expect(200)
      .expect("Content-Type", /json/);
  });
  it("POST unable to post invalid url", async () => {
    const res = await request(app)
      .post("/api/url/createShortenUrl")
      .query({ actualUrl: "abc" })
      .expect(401);
  });
});
