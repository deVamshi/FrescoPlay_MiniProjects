const express = require("express");
const Course = require("../mongoose/models/courses");
const mongoose = require("mongoose");

const usersRouter = new express.Router();

usersRouter.get("/getAll", async (req, res) => {
  const all = await Course.find();
  res.json(all);
});

// Endpoints

usersRouter.post("/enroll/:id", async (req, res) => {
  // const _id = req.params.id;
  try {
    const courseBefore = await Course.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { isApplied: true },
      {
        new: false, // this gives us the document before updating
      }
    );

    if (courseBefore.isApplied == false) {
      res.json({
        message: "You have successfully enrolled for the course",
      });
    } else {
      res.status(403).json({
        error: "You have already applied for this course",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Error...",
    });
  }
});

usersRouter.delete("/drop/:id", async (req, res) => {
  // const _id = req.params.id;
  try {
    const courseBefore = await Course.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { isApplied: false },
      {
        new: false, // this gives us the document before updating
      }
    );

    if (courseBefore.isApplied == true) {
      res.json({
        message: "You have dropped the course",
      });
    } else {
      res.status(403).json({
        error: "You have not enrolled for this course",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Error...",
    });
  }
});

usersRouter.get("/get", async (req, res) => {
  try {
    const all = await Course.find();
    res.json(all);
  } catch (error) {
    res.status(400).json({
      error: "Error...",
    });
  }
});

usersRouter.patch("/rating/:id", async (req, res) => {
  // const _id = req.params.id;
  try {
    const courseBefore = await Course.findById({
      _id: req.params.id,
    });

    // not applied at all
    if (courseBefore.isApplied == false || courseBefore.isRated == true) {
      res.status(403).json({
        error:
          courseBefore.isApplied == false
            ? "You have not enrolled for this course"
            : "You have already rated this course",
      });
    } else {
      const newNoOfRating = courseBefore.noOfRatings + 1;

      const ratingSent = req.body.rating;

      function roundedToFixed(input, digits) {
        var rounder = Math.pow(10, digits);
        return (Math.round(input * rounder) / rounder).toFixed(digits);
      }

      const newRating = roundedToFixed(
        (courseBefore.noOfRatings * courseBefore.rating + ratingSent) /
          newNoOfRating,
        1
      );

      courseBefore.isRated = true;
      courseBefore.rating = newRating;
      courseBefore.noOfRatings = newNoOfRating;
      await courseBefore.save();
      res.json({
        message: "You have rated this course",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

module.exports = usersRouter;
