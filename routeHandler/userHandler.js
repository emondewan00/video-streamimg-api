const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../Schema/userSchema");
const ApiFeatures = require("../utils/ApiFeaturs");

//get all users
router.get("/", async (req, res) => {
  try {
    const usersQuery = new ApiFeatures(User.find(), req.query)
      .sort()
      .getNumberOfDocument()
      .limitFields();

    const users = await usersQuery.query;

    // const result = await User.find();
    res.status(200).json({
      status: "Success",
      length: users.length,
      data: { users: users },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "fail",
      data: {
        result: error.message,
      },
    });
  }
});

//get users by search text
router.get("/search", async (req, res) => {
  try {
    const text = req.query.text;
    const users = await User.find({ $text: { $search: text } });
    res.send({
      status: "success",
      length: users?.length,
      data: { result: users },
    });
  } catch (error) {
    res.send(error);
  }
});

//create a user
router.post("/", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        user: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        result: error.message,
      },
    });
  }
});
//find user using email
router.get("/:email", async (req, res) => {
  try {
    const result = await User.findOne({ email: req.params.eamil });
    res.status(200).json({
      status: "success",
      data: {
        user: result,
      },
    });
  } catch (error) {
    res.send(error);
  }
});

//edit User
router.post("/edit/:id", async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "Success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.send(error);
  }
});

//delete a users
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    res.status(201).json({
      status: "Success",
      data: { result },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: {
        result: error.message,
      },
    });
  }
});

module.exports = router;
