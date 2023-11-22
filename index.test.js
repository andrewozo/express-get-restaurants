const request = require("supertest");
const app = require("./src/app");
const Restaurant = require("./models/Restaurant");

beforeEach(() => {});

describe("endpoint testing", () => {
  test("returns right status code", async () => {
    const response = await request(app).get("/restaurants");

    expect(response.statusCode).toBe(200);
  });

  test("returns array of restaurants", async () => {
    const response = await request(app).get("/restaurants");

    expect(typeof response.body).toEqual("object");
  });

  test("returns correct number of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    const restaurants = await Restaurant.findAll();

    expect(response.body.length).toBe(restaurants.length);
  });

  test("returns correct data for restaurants", async () => {
    const response = await request(app).get("/restaurants");

    expect(response.body[0].name).toBe("AppleBees");
  });

  test("/restaurants/:id returns correct data", async () => {
    const response = await request(app).get("/restaurants/5");

    expect(response.body.name).toBe("Drews Bodega");
  });

  test("post request returns updated array", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "food spot",
      location: "somewhere",
      cuisine: "food",
    });

    expect(response.body.name).toBe("food spot");
  });

  test("put request updates correctly", async () => {
    const response = await request(app).put("/restaurants/11").send({
      name: "something2",
    });

    console.log(response);
  });
});
