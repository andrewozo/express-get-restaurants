const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
});

app.get("/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
});

app.post("/restaurants", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
});

app.put("/restaurants/:id", async (req, res, next) => {
  try {
    const updated = await Restaurant.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updated[0] === 0) {
      throw new Error("Update not completed");
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.delete("/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);

    await restaurant.destroy();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
