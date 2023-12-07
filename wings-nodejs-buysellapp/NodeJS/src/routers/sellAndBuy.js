const e = require("express");
const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy");

// setting up the router

const sellAndBuyRouter = new express.Router();

// code goes here for routes

// get all products
sellAndBuyRouter.get("/sellProduct", async (req, res, next) => {
  var filter = {};
  var sortBy = {};
  // querying
  if (req.query.product) filter.productName = req.query.product;
  // sorting
  if (req.query.sortBy) {
    // query param
    const sortByField = req.query.sortBy;

    // ascending or descending order
    const order = sortByField.includes("lower") ? 1 : -1;

    // by which field
    if (sortByField.includes("Cost")) sortBy.costPrice = order;
    else sortBy.soldPrice = order;
  }

  SellBuy.find(filter)
    .sort(sortBy)
    .exec((err, docs) => {
      if (err) res.sendStatus(400);
      res.json(docs);
    });
});

// post add product
sellAndBuyRouter.post("/sellProduct", async (req, res) => {
  const newProd = new SellBuy(req.body);
  newProd
    .save()
    .then((doc) => {
      res.status(201).json({
        message: "Product Added",
      });
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        for (const key in err.errors) {
          return res.status(400).json({ error: err.errors[key].message });
          break;
        }
      }
      res.sendStatus(400);
    });
});

// patch for update product
sellAndBuyRouter.patch("/sellProduct/:id", async (req, res) => {
  SellBuy.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { soldPrice: req.body.soldPrice } },
    { runValidators: true }
  )
    .then((data) => {
      res.status(200).json({
        message: "Updated Successfully",
      });
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        for (const key in err.errors) {
          return res.status(400).json({ error: err.errors[key].message });
          break;
        }
      }
      res.status(400).json(err.name);
    });
});

// delete
sellAndBuyRouter.delete("/sellProduct/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDocument = await SellBuy.findByIdAndDelete(id);

    if (deletedDocument) {
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.status(400).json({ error: "Internal server error." });
  }
});

// exporting the router

module.exports = sellAndBuyRouter;
